from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils import timezone


def get_time():
    return timezone.localtime(timezone.now())


class SuperModel(models.Model):
    class Meta:
        abstract = True

    created_on = models.DateTimeField(
        null=False, default=get_time, db_index=True)
    modified_on = models.DateTimeField(null=False, default=get_time)

    def save(self, *args, **kwargs):
        """Override the SuperModel save to handle modified_on logic."""
        self.modified_on = get_time()
        return super(SuperModel, self).save(*args, **kwargs)


class Profile(SuperModel):
    user = models.OneToOneField( User, on_delete=models.SET_NULL, null=True, blank=True)
    handle = models.CharField(max_length=255, db_index=True)
    email = models.CharField(max_length=255, blank=True, db_index=True)

    @property
    def github_url(self):
        return f"https://github.com/{self.handle}"

    def __str__(self):
        return self.handle


class Project(SuperModel):
    name = models.CharField(max_length=255, db_index=True)
    user = models.ForeignKey(User, related_name='projects', on_delete=models.CASCADE,null=True,help_text=('The projects of a user.'))

    @property
    def github_url(self):
        return f"https://github.com/{user.handle}/{self.name}"

    def __str__(self):
        return self.name


class UserAction(SuperModel):
    ACTION_TYPES = [
        ("Login", "Login"),
        ("Logout", "Logout"),
        ("Commit", "Commit"),
    ]
    user = models.ForeignKey(User, related_name="actions",
                             on_delete=models.SET_NULL, null=True)
    profile = models.ForeignKey(
        Profile, related_name="actions", on_delete=models.CASCADE)
    action = models.CharField(max_length=50, choices=ACTION_TYPES)
    ip_address = models.GenericIPAddressField(null=True)
    location_data = JSONField(default=dict)

    def __str__(self):
        # Ignore LineLengthBear
        return "{} by {} at {}".format(self.action, self.profile, self.created_on)
