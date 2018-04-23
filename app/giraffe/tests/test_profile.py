import random
import string

from django.conf import settings
from django.test import TestCase

from giraffe.models import Profile
from giraffe.tests.utils import random_id


class TestProfile(TestCase):

    def test_is_org(self):
        profile = Profile(data={'type': 'Organization'})
        self.assertTrue(profile.is_org)

    def test_is_org_false(self):
        profile = Profile(data={'type': 'Not Organization'})
        self.assertFalse(profile.is_org)

    def test_is_org_no_type_key(self):
        profile = Profile(data={})
        self.assertFalse(profile.is_org)

    def test_github_url(self):
        id = random_id()
        profile = Profile(handle=id)
        self.assertEqual(f"https://github.com/{id}", profile.github_url)

    def test_local_avatar_url(self):
        settings.BASE_URL = 'http://test/'
        id = random_id()
        profile = Profile(handle=id)

        self.assertEqual(
            f"http://test/funding/avatar?repo={profile.github_url}&v=3",
            profile.local_avatar_url
        )
