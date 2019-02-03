from django.urls import path

from .views import login, logout, callback

app_name = "oauth"

urlpatterns = [
    path("callback/", callback, name="callback"),
    path("login/", login, name="login"),
    path("logout/", logout, name="logout"),
]
