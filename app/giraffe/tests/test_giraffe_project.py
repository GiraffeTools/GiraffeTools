import io
import os
from unittest import mock

from django.test import TestCase

from giraffe.models import GiraffeProject
from giraffe.tests.utils import random_id


class TestGiraffeProject(TestCase):

    @mock.patch('giraffe.models.urlopen')
    def test_config_set_from_config_yml(self, mock_urlopen):
        self.mock_with_example_config(mock_urlopen)
        project = GiraffeProject()
        config = project.config
        self.assertEqual({
            'tools': {
                'porcupine': {
                    'file': ['GIRAFFE/porcupine.pork']
                }
            }
        }, config)

    @mock.patch('giraffe.models.urlopen')
    def test_tools_set_from_config(self, mock_urlopen):
        self.mock_with_example_config(mock_urlopen)
        project = GiraffeProject(
            ghuser='user',
            ghrepo='repo',
            ghbranch='branch'
        )
        random_name = random_id()
        project.config = {
            'tools': {
                random_name: {
                    'file': [f'GIRAFFE/literallyanything']
                }
            }
        }
        tools = project.tools
        self.assertEqual([[
            random_name,
            f'/gh/user/repo/branch/{random_name}'
        ]], tools)

    @mock.patch('giraffe.models.urlopen')
    def test_get_tool_file_data_returns_None_when_no_json(self, mock_urlopen):
        self.mock_with_example_config(mock_urlopen)
        project = GiraffeProject()

        mock_urlopen.return_value = io.BytesIO(bytes('not json', encoding="utf-8"))
        random_name = random_id()
        random_filename = random_id()
        project.config = {
            'tools': {
                random_name: {
                    'file': [f'GIRAFFE/{random_filename}']
                }
            }
        }
        self.assertEqual(None, project.get_tool_file_data(random_name))

    @mock.patch('giraffe.models.urlopen')
    def test_get_tool_file_data_returns_json(self, mock_urlopen):
        self.mock_with_example_config(mock_urlopen)
        project = GiraffeProject()

        mock_urlopen.return_value = io.BytesIO(bytes('{"test": "test"}', encoding="utf-8"))
        random_name = random_id()
        random_filename = random_id()
        project.config = {
            'tools': {
                random_name: {
                    'file': [f'GIRAFFE/{random_filename}']
                }
            }
        }
        self.assertEqual({
            'test': 'test'
        }, project.get_tool_file_data(random_name))

    @staticmethod
    def mock_with_example_config(mock_urlopen):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        config = open(f'{dir_path}/example_config.yml').read()
        mock_urlopen.return_value = io.BytesIO(bytes(config, encoding="utf-8"))
