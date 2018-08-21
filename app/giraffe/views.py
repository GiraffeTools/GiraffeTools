import urllib.error
import urllib.request

from django.http import Http404
from django.http import HttpResponseRedirect
from django.template.response import TemplateResponse
from django.template.exceptions import TemplateDoesNotExist
from django.template import loader

from giraffe.models import GiraffeProject
from giraffe.utils import are_valid_github_details
from giraffe.utils import send_slack_invitation_to_email
from giraffe.forms import SlackForm


def index(request):
    context = {
        "github_handle": request.session.get("handle"),
    }
    return TemplateResponse(request, "giraffe.html", context)


def user(request, ghuser=""):
    context = {
        "ghuser": ghuser,
        "github_handle": request.session.get("handle"),
        "user_repos": request.session.get("user_repos"),
    }

    return TemplateResponse(request, "user.html", context)


def project(request, ghuser="", ghrepo="", ghbranch="master"):
    """
    Recognise that this is a github repository that contains
    a GIRAFFE.yml file
    """

    if not are_valid_github_details(ghuser, ghrepo, ghbranch):
        raise Http404

    try:
        giraffeConfig = GiraffeProject(ghuser, ghrepo, ghbranch)
    except urllib.error.HTTPError:
        giraffeConfig = None

    context = {
        "ghuser": ghuser,
        "ghrepo": ghrepo,
        "ghbranch": ghbranch,
        "giraffeConfig": giraffeConfig
    }

    return TemplateResponse(request, "project.html", context)


def projectTool(request, ghuser="", ghrepo="", ghbranch="master", toolName=""):
    """
    Recognise that this is a github repository with GIRAFFE.yml defining
    this tool
    """
    template_name = f"{toolName}.html"

    # Checks if Github details are correct // Else 404
    if not are_valid_github_details(ghuser, ghrepo, ghbranch):
        raise Http404

    # Checks if toolName template exists // Else 404
    try:
        loader.get_template(template_name)
    except TemplateDoesNotExist:
        raise Http404

    try:
        giraffeConfig = GiraffeProject(ghuser, ghrepo, ghbranch)
        filePath = giraffeConfig.get_tool_attribute(toolName, "file")[0]
        params = {
            "ghuser": ghuser,
            "ghrepo": ghrepo,
            "ghbranch": ghbranch,
            "giraffeConfig": giraffeConfig,
            "filename": f"https://raw.githubusercontent.com/{ghuser}/{ghrepo}/{ghbranch}/{filePath}"
        }
    # If the Github details are correct but the Girrafe.yml file is not there
    except urllib.error.HTTPError:
        params = {
            "config_error": "GIRAFFE.yml missing from github Branch"
        }

    # If the Girrafe.yml is present Girrafe.yml but missing path to tool file
    except:  # Ignore PycodestyleBear (E722)
        params = {
            "config_error": f"Missing path to the {toolName} file"
        }

    return TemplateResponse(request, template_name, params)


def slack(request):
    if request.method == "POST":
        form = SlackForm(request.POST)
        if form.is_valid():
            send_slack_invitation_to_email(form.cleaned_data["email"])
            return HttpResponseRedirect("/slack/thanks")

    else:
        form = SlackForm()

    return TemplateResponse(request, "slack.html", {"form": form})


def slack_thanks(request):
    return TemplateResponse(request, "slack_thanks.html")
