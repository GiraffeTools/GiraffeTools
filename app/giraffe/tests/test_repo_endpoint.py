import io
from unittest import mock
from urllib.error import HTTPError

from django.test import TestCase


class TestMethods(TestCase):
    existing_repo = {
        'gh_user': 'TimVanMourik',
        'gh_repo': 'SomeGiraffeExample',
        'gh_branch': 'master'
    }

    non_existing_repo = {
        'gh_user': 'TimVanMourik',
        'gh_repo': 'DefinitelyNotMyWork',
        'gh_branch': 'master'
    }

    @mock.patch('giraffe.utils.urlopen')
    def test_existing_repo_url(self, mock_urlopen):
        response = '[{{"name": "{}"}}]'.format(self.existing_repo['gh_branch'])
        mock_urlopen.return_value = io.BytesIO(bytes(response, encoding="utf-8"))
        user_repo_branch = self.get_user_repo_branch(self.existing_repo)
        url = self.build_url(user_repo_branch)

        response = self.client.get(url)
        self.assertEqual(200, response.status_code)

    @mock.patch('giraffe.utils.urlopen')
    def test_nonexisting_repo_url(self, mock_urlopen):
        user_repo_branch = self.get_user_repo_branch(self.non_existing_repo)
        url = self.build_url(user_repo_branch)
        mock_urlopen.side_effect = HTTPError(
            url=url,
            code=404,
            msg='Not Found',
            hdrs=None,
            fp=None
        )

        response = self.client.get(url)
        self.assertEqual(404, response.status_code)

    def build_url(self, user_repo_branch):
        return f"/gh/{'/'.join(user_repo_branch)}/"

    def get_user_repo_branch(self, repo):
        return [
            repo['gh_user'],
            repo['gh_repo'],
            repo['gh_branch']
        ]
