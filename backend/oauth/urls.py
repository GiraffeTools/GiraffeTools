from django.urls import path

from .views import login, logout_view, callback

app_name = "oauth"

urlpatterns = [
    path("callback/", callback, name="callback"),
    path("login/", login, name="login"),
    path("logout/", logout_view, name="logout"),
]
