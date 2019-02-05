from django.shortcuts import redirect
from django.http import Http404
from django.contrib.auth import logout

from giraffe.utils import log_action


def login(request):
    return redirect("social:begin", backend="github")


def logout_view(request):
    logout(request)
    log_action(request, "Logout")
    # TODO make logout screen
    return redirect("/")


def callback(request):
    redirect_uri = request.GET.get("redirect_uri")
    if not redirect_uri:
        raise Http404

    return redirect(redirect_uri)
