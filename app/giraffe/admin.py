from django.contrib import admin

from .models import Profile, UserAction

admin.site.register(Profile)
admin.site.register(UserAction)
