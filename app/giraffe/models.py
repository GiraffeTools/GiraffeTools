from django.db import models
from django.contrib.postgres.fields import JSONField
from django.utils import timezone


import functools, json, pydash, urllib.error, urllib.request, yaml
from github.utils import get_time

class GiraffeProject:

    def __init__(self, ghuser='', ghrepo='', ghbranch='master'):
        self.ghuser = ghuser
        self.ghrepo = ghrepo
        self.ghbranch = ghbranch
        self.giturl = f"https://raw.githubusercontent.com/{ghuser}/{ghrepo}/{ghbranch}/"
        with urllib.request.urlopen(self.giturl + "GIRAFFE.yml") as url:
            self.config = yaml.load(url.read().decode())

    @property
    def tools(self):
        definedTools = self.config.get('tools', {})
        return functools.reduce(
            lambda toolsList, toolName:
                toolsList + [[toolName, self.getToolPath(toolName)]],
                definedTools,
                [])

    def getToolPath(self, toolName):
        return f"/{self.ghuser}/{self.ghrepo}/{self.ghbranch}/{toolName}"

    def getToolAttribute(self, toolName, attribute):
        return pydash.get(self.config, f"tools.{toolName}.{attribute}")

    def getToolFileData(self, toolName):
        filePath = self.getToolAttribute(toolName, 'file')[0]
        fileUrl = f"https://raw.githubusercontent.com/{self.ghuser}/{self.ghrepo}/{self.ghbranch}/{filePath}"
        try:
            with urllib.request.urlopen(fileUrl) as url:
                fileData = json.loads(url.read().decode())
        except (urllib.error.HTTPError, ValueError):
            fileData = None
        return fileData


def get_time():
    return timezone.localtime(timezone.now())

class SuperModel(models.Model):
    """Define the base abstract model."""

    class Meta:
        """Define the model metadata."""

        abstract = True

    created_on =  models.DateTimeField(null=False, default=get_time, db_index=True)
    modified_on = models.DateTimeField(null=False, default=get_time)

    def save(self, *args, **kwargs):
        self.modified_on = get_time()
        return super(SuperModel, self).save(*args, **kwargs)

class Profile(SuperModel):
    """Define the structure of the user profile."""

    data                = JSONField()
    handle              = models.CharField(max_length=255, db_index=True)
    last_sync_date      = models.DateTimeField(null=True)
    email               = models.CharField(max_length=255, blank=True, db_index=True)
    github_access_token = models.CharField(max_length=255, blank=True, db_index=True)
    repos_data          = JSONField(default={})

    @property
    def is_org(self):
        return self.data['type'] == 'Organization'

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
