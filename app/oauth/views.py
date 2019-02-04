from django.shortcuts import redirect
from django.conf import settings
from django.http import Http404


def login(request):
    return redirect("social:begin", backend="github")


def logout(request):
    return redirect(settings.LOGOUT_URL, backend="github")


def callback(request):
    redirect_uri = request.GET.get("redirect_uri")
    if not redirect_uri:
        raise Http404

    return redirect(redirect_uri)
