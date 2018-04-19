import unittest
import os
from django.urls import reverse
from django.test import Client

class TestMethods(unittest.TestCase):

    def test_giraffe_url(self):
        client = Client()
        response = client.get(reverse('porcupine'))
        assert response.status_code == 200

    def test_existing_repo_url(self):
        existingRepo =    { 'gh_user':    'TimVanMourik',
                            'gh_repo':    'SomeGiraffeExample',
                            'gh_branch':  'master'}
        repo = existingRepo;
        client = Client()
        response = client.get('/' + os.path.join(repo['gh_user'], repo['gh_repo'], repo['gh_branch']))
        # assert response.status_code == 200

    def test_nonexisting_repo_url(self):
        nonExistingRepo = { 'gh_user':    'TimVanMourik',
                            'gh_repo':    'DefinitelyNotMyWork',
                            'gh_branch':  'master'}
        repo = nonExistingRepo;
        client = Client()
        response = client.get('/' + os.path.join(repo['gh_user'], repo['gh_repo'], repo['gh_branch']))
        # assert response.status_code == 404



if __name__ == '__main__':
    unittest.main()
