from django.shortcuts import redirect
from django.conf import settings

def login(request):
    return redirect("social:begin", backend="github")


def logout(request):
    return redirect(settings.LOGOUT_URL, backend="github")
