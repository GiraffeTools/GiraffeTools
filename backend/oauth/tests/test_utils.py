# -*- coding: utf-8 -*-
"""Handle github utility related tests.

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

from django.conf import settings
from django.test import TestCase
from django.test.utils import override_settings


@override_settings(BASE_URL="http://localhost:8000")
@override_settings(GITHUB_CLIENT_ID="TEST")
@override_settings(GITHUB_CLIENT_SECRET="TEST")
@override_settings(GITHUB_SCOPE="user")
class GithubUtilitiesTest(TestCase):
    """
    Define tests for Github utils.
    """

    def setUp(self):
        """
        Perform setup for the testcase.
        """
        self.callback_code = "e7ab3584569f7b23d005"
        self.user_oauth_token = "bcd1c26b4fb8ddcbc7685ea9be33217434ef642f"

    def test_build_auth_dict(self):
        """
        Test the github utility build_auth_dict method.
        """
        auth_dict = build_auth_dict(self.user_oauth_token)

        assert isinstance(auth_dict, dict)
        assert auth_dict == {
            "api_url": settings.GITHUB_API_BASE_URL,
            "client_id": settings.GITHUB_CLIENT_ID,
            "client_secret": settings.GITHUB_CLIENT_SECRET,
            "oauth_token": self.user_oauth_token
        }
