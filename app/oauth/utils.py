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
import requests
import logging
import dateutil.parser
from datetime import timedelta
from urllib.parse import quote_plus, urlencode
from rest_framework.reverse import reverse

from django.conf import settings
from django.utils import timezone

from github import Github, InputGitTreeElement


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


def build_auth_dict(oauth_token):
    return {
        "api_url": settings.GITHUB_API_BASE_URL,
        "client_id": settings.GITHUB_CLIENT_ID,
        "client_secret": settings.GITHUB_CLIENT_SECRET,
        "oauth_token": oauth_token
    }


def github_connect(token=None):
    github_client = None
    if not token:
        token = settings.GITHUB_API_TOKEN

    try:
        github_client = Github(
            login_or_token=token,
            client_id=settings.GITHUB_CLIENT_ID,
            client_secret=settings.GITHUB_CLIENT_SECRET,
        )

    except BadCredentialsException as e:
        logger.exception(e)
    return github_client



def is_github_token_valid(oauth_token=None, last_validated=None):
    expire_time = timedelta(hours=1)

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
        if (timezone.now() - last_validated) < expire_time:
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


def get_github_user(handle):
    user = handle.replace('@', '')
    url = f'https://api.github.com/users/{user}'
    response = requests.get(url, auth=_AUTH, headers=HEADERS)

    try:
        response_dict = response.json()
    except JSONDecodeError:
        response_dict = {}

    return response_dict
