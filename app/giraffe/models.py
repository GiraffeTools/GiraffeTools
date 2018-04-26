import functools
import json
import urllib.error
from urllib.request import urlopen

import pydash
import yaml
from django.conf import settings
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils import timezone

from github.utils import get_time


class GiraffeProject:

    def __init__(self, ghuser='', ghrepo='', ghbranch='master'):
        self.ghuser = ghuser
        self.ghrepo = ghrepo
        self.ghbranch = ghbranch
        self.giturl = f"https://raw.githubusercontent.com/{ghuser}/{ghrepo}/{ghbranch}/"
        with urlopen(self.giturl + "GIRAFFE.yml") as url:
            self.config = yaml.load(url.read().decode())

    @property
    def tools(self):
        definedTools = self.config.get('tools', {})
        return functools.reduce(
            lambda toolsList, toolName: toolsList + [[toolName, self.get_tool_path(toolName)]],
            definedTools,
            []
        )

    def get_tool_path(self, toolName):
        return f"/gh/{self.ghuser}/{self.ghrepo}/{self.ghbranch}/{toolName}"

    def get_tool_attribute(self, toolName, attribute):
        return pydash.get(self.config, f"tools.{toolName}.{attribute}")

    def get_tool_file_data(self, toolName):
        filePath = self.get_tool_attribute(toolName, 'file')[0]
        fileUrl = f"https://raw.githubusercontent.com/{self.ghuser}/{self.ghrepo}/{self.ghbranch}/{filePath}"
        try:
            with urlopen(fileUrl) as url:
                fileData = json.loads(url.read().decode())
        except (urllib.error.HTTPError, ValueError) as e:
            fileData = None
        return fileData


def get_time():
    return timezone.localtime(timezone.now())


class SuperModel(models.Model):
    """Define the base abstract model."""

    class Meta:
        """Define the model metadata."""

        abstract = True

    created_on = models.DateTimeField(null=False, default=get_time, db_index=True)
    modified_on = models.DateTimeField(null=False, default=get_time)

    def save(self, *args, **kwargs):
        self.modified_on = get_time()
        return super(SuperModel, self).save(*args, **kwargs)


class Profile(SuperModel):
    managed = False
    """Define the structure of the user profile."""

    data = JSONField()
    handle = models.CharField(max_length=255, db_index=True)
    last_sync_date = models.DateTimeField(null=True)
    email = models.CharField(max_length=255, blank=True, db_index=True)
    github_access_token = models.CharField(max_length=255, blank=True, db_index=True)
    repos_data = JSONField(default={})

    @property
    def is_org(self):
        try:
            return self.data['type'] == 'Organization'
        except KeyError:
            return False

    @property
    def github_url(self):
        return f"https://github.com/{self.handle}"

    @property
    def local_avatar_url(self):
        return f"{settings.BASE_URL}funding/avatar?repo={self.github_url}&v=3"

    @property
    def absolute_url(self):
        return self.get_absolute_url()

    def __str__(self):
        return self.handle

    def get_relative_url(self, preceding_slash=True):
        return "{}profile/{}".format('/' if preceding_slash else '', self.handle)

    def get_absolute_url(self):
        return settings.BASE_URL + self.get_relative_url(preceding_slash=False)

# class UserAction(SuperModel):
#     """Records Actions that a user has taken ."""
#
#     ACTION_TYPES = [
#         ('Login',  'Login'),
#         ('Logout', 'Logout'),
#     ]
#     action   = models.CharField(max_length=50, choices=ACTION_TYPES)
#     profile  = models.ForeignKey('giraffe.Profile', related_name='actions', on_delete=models.CASCADE)
#     metadata = JSONField(default={})
#
#     def __str__(self):
#         return "{} by {} at {}".format(self.action, self.profile, self.created_on)
