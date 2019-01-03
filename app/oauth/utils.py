# -*- coding: utf-8 -*-
"""Handle miscellaneous logic and utilities.

Copyright (C) 2018 Gitcoin Core

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.

"""
import logging
from datetime import timedelta
from urllib.parse import quote_plus, urlencode

from django.conf import settings
from django.utils import timezone

import dateutil.parser
import requests

from rest_framework.reverse import reverse

logger = logging.getLogger(__name__)

_AUTH = (settings.GITHUB_API_USER, settings.GITHUB_API_TOKEN)
BASE_URI = settings.BASE_URL.rstrip("/")
HEADERS = {"Accept": "application/vnd.github.squirrel-girl-preview"}
V3HEADERS = {"Accept": "application/vnd.github.v3.text-match+json"}
JSON_HEADER = {
    "Accept": "application/json",
    "User-Agent": settings.GITHUB_APP_NAME,
    "Origin": settings.BASE_URL
}
TOKEN_URL = "{api_url}/applications/{client_id}/tokens/{oauth_token}"


def get_time():
    return localtime(timezone.now())


def build_auth_dict(oauth_token):
    return {
        "api_url": settings.GITHUB_API_BASE_URL,
        "client_id": settings.GITHUB_CLIENT_ID,
        "client_secret": settings.GITHUB_CLIENT_SECRET,
        "oauth_token": oauth_token
    }


def is_github_token_valid(oauth_token=None, last_validated=None):
    # If no OAuth token was provided, no checks necessary.
    if not oauth_token:
        return False

    # If validation datetime string is passed, parse it to datetime.
    if last_validated:
        try:
            last_validated = dateutil.parser.parse(last_validated)
        except ValueError:
            print("Validation of date failed.")
            last_validated = None

    # Check whether or not the user's access token has been validated recently.
    if oauth_token and last_validated:
        if (timezone.now() - last_validated) < timedelta(hours=1):
            return True

    _params = build_auth_dict(oauth_token)
    _auth = (_params["client_id"], _params["client_secret"])
    url = TOKEN_URL.format(**_params)
    response = requests.get(url, auth=_auth, headers=HEADERS)

    if response.status_code == 200:
        return True
    return False


def revoke_token(oauth_token):
    '""Revoke the specified token.""'
    _params = build_auth_dict(oauth_token)
    _auth = (_params["client_id"], _params["client_secret"])
    url = TOKEN_URL.format(**_params)
    response = requests.delete(url, auth=_auth, headers=HEADERS)
    if response.status_code == 204:
        return True
    return False


def reset_token(oauth_token):
    _params = build_auth_dict(oauth_token)
    _auth = (_params["client_id"], _params["client_secret"])
    url = TOKEN_URL.format(**_params)
    response = requests.post(url, auth=_auth, headers=HEADERS)
    if response.status_code == 200:
        return response.json().get("token")
    return ""


def get_auth_url(redirect_uri="/"):
    """
    Build the Github authorization URL.

    Args:
        redirect_uri (str): The redirect URI to be used during authentication.

    Attributes:
        github_callback (str): The local path to the Github callback view.
        redirect_params (dict): The redirect paramaters to URL encode.
        params (dict): The URL parameters to encode.
        auth_url (str): The URL encoded Github authentication parameters.

    Returns:
        str: The Github authentication URL.

    """
    github_callback = reverse("oauth:github_callback")
    redirect_params = {"redirect_uri": BASE_URI + redirect_uri}
    redirect_uri = urlencode(redirect_params, quote_via=quote_plus)

    params = {
        "client_id": settings.GITHUB_CLIENT_ID,
        "scope": settings.GITHUB_SCOPE,
        "redirect_uri": f"{BASE_URI}{github_callback}?{redirect_uri}"
    }
    auth_url = urlencode(params, quote_via=quote_plus)

    return settings.GITHUB_AUTH_BASE_URL + f"?{auth_url}"


def get_github_user_token(code, **kwargs):
    _params = {
        "code": code,
        "client_id": settings.GITHUB_CLIENT_ID,
        "client_secret": settings.GITHUB_CLIENT_SECRET
    }
    # Add additional parameters to the request paramaters.
    _params.update(kwargs)
    response = requests.get(settings.GITHUB_TOKEN_URL,
                            headers=JSON_HEADER, params=_params)
    response = response.json()
    scope = response.get("scope", None)
    if scope:
        access_token = response.get("access_token", None)
        return access_token
    return None


def get_github_user_data(oauth_token):
    headers = dict({"Authorization": f"token {oauth_token}"}, **JSON_HEADER)
    response = requests.get("https://api.github.com/user", headers=headers)
    if response.status_code == 200:
        return response.json()
    return {}


def get_github_primary_email(oauth_token):
    headers = dict({"Authorization": f"token {oauth_token}"}, **JSON_HEADER)
    response = requests.get(
        "https://api.github.com/user/emails", headers=headers)

    if response.status_code == 200:
        emails = response.json()
        for email in emails:
            if email.get("primary"):
                return email.get("email", "")

    return ""


def get_github_repos(oauth_token):
    headers = dict({"Authorization": f"token {oauth_token}"}, **JSON_HEADER)
    response = requests.get(
        "https://api.github.com/user/repos", headers=headers)

    if response.status_code == 200:
        repos = response.json()
        names = [r["full_name"] for r in repos]
        return names

    return ""


def search(query):
    params = (
        ("q", query),
        ("sort", "updated"),
    )

    response = requests.get("https://api.github.com/search/users",
                            auth=_AUTH, headers=V3HEADERS, params=params)
    return response.json()


def get_user(user, sub_path=""):
    user = user.replace("@", "")
    url = f"https://api.github.com/users/{user}{sub_path}"
    response = requests.get(url, auth=_AUTH, headers=HEADERS)

    return response.json()


def repo_url(issue_url):
    return "/".join(issue_url.split("/")[:-2])


def org_name(issue_url):
    return issue_url.split("/")[3]


def repo_name(issue_url):
    return issue_url.split("/")[4]


def issue_number(issue_url):
    return issue_url.split("/")[6]
