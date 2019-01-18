# -*- coding: utf-8 -*-
"""Handle github views.

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

from __future__ import print_function, unicode_literals

import time
import json

from django.http import Http404, HttpResponse
from django.shortcuts import redirect
# from django.utils import timezone
from django.views.decorators.http import require_GET

from oauth.utils import (
    get_auth_url,
    get_github_primary_email,
    get_github_user_data,
    get_github_user_token,
    revoke_token,
    get_github_repos,
)


@require_GET
def github_callback(request):
    # Get request parameters to handle authentication and the redirect.
    code = request.GET.get("code", None)
    redirect_uri = request.GET.get("redirect_uri")

    if not code or not redirect_uri:
        raise Http404

    # Get OAuth token and github user data.
    access_token = get_github_user_token(code)
    github_user_data = get_github_user_data(access_token)
    handle = github_user_data.get("login")
    # github_repos = get_github_repos(access_token)

    if handle:
        # Create or update the Profile with the github user data.
        # user_profile, _ = Profile.objects.update_or_create(
        #     handle=handle,
        #     defaults={
        #         'data': github_user_data or {},
        #         'email': get_github_primary_email(access_token),
        #         'github_access_token': access_token
        #     })

        # Update the user's session with handle and email info.
        session_data = {
            "handle": handle,
            # "user_repos": github_repos,
            # "email": get_github_primary_email(access_token),
            "access_token": access_token,
            "name": github_user_data.get("name", None),
            # "access_token_last_validated": timezone.now().isoformat(),
        }
        for k, v in session_data.items():
            request.session[k] = v

        # # record a useraction for this
        # UserAction.objects.create(
        #     profile=user_profile,
        #     action='Login',
        #     metadata={},
        #     )

    response = redirect(redirect_uri)
    response.set_cookie("last_github_auth_mutation", int(time.time()))
    return response


@require_GET
def github_authentication(request):
    redirect_uri = request.GET.get("redirect_uri", "/")

    if not request.session.get("access_token"):
        return redirect(get_auth_url(redirect_uri))

    response = redirect(redirect_uri)
    response.set_cookie("last_github_auth_mutation", int(time.time()))
    return response


def logged_in(request):
    user = {
        "access_token": request.session.get("access_token", False),
        "github_handle": request.session.get("handle", False),
        "github_email": request.session.get("email", False),
        "github_name": request.session.get("name", False),
    }
    # user = {
    #     "access_token": True,
    #     "github_handle":"test_handle",
    #     "github_email": "test_email",
    #     "github_name": "test_name",
    # }
    return HttpResponse(json.dumps(user), content_type="application/json")


def github_logout(request):
    access_token = request.session.pop("access_token", "")
    request.session.pop("handle", "")
    request.session.pop("user_repos", "")
    redirect_uri = request.GET.get("redirect_uri", "/")

    if access_token:
        revoke_token(access_token)
        # request.session.pop("access_token_last_validated")
        # Profile.objects.filter(handle=handle).update(github_access_token='')
        # # record a useraction for this
        # if Profile.objects.filter(handle=handle).count():
        #     UserAction.objects.create(
        #         profile=Profile.objects.get(handle=handle),
        #         action='Logout',
        #         metadata={},
        #         )

    request.session.modified = True
    response = redirect(redirect_uri)
    response.set_cookie("last_github_auth_mutation", int(time.time()))
    return response
