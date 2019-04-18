from django.contrib import admin

from .models import Profile, UserAction, Project

admin.site.register(Profile)
admin.site.register(Project)
admin.site.register(UserAction)
