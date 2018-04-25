import urllib.error
import urllib.request

import pydash
from django.http import HttpResponse, Http404
from django.template.response import TemplateResponse

from giraffe.models import GiraffeProject
from giraffe.utils import are_valid_github_details


def index(request):
    context = {
        'github_handle': request.session.get('handle'),
    }
    return TemplateResponse(request, 'index.html', context)


def user(request, ghuser=''):
    context = {
        'ghuser': ghuser,
        'github_handle': request.session.get('handle'),
        'user_repos': request.session.get('user_repos'),
    }

    return TemplateResponse(request, 'user.html', context)


def project(request, ghuser='', ghrepo='', ghbranch='master'):
    """Recognise that this is a github repository that contains a GIRAFFE.yml file"""

    if not are_valid_github_details(ghuser, ghrepo, ghbranch):
        raise Http404

    try:
        giraffeConfig = GiraffeProject(ghuser, ghrepo, ghbranch)
    except urllib.error.HTTPError:
        giraffeConfig = None

    context = {
        'ghuser': ghuser,
        'ghrepo': ghrepo,
        'ghbranch': ghbranch,
        'giraffeConfig': giraffeConfig
    }

    return TemplateResponse(request, 'project.html', context)


def projectTool(request, ghuser='', ghrepo='', ghbranch='master', toolName=''):
    """Recognise that this is a github repository with GIRAFFE.yml defining this tool"""

    if not are_valid_github_details(ghuser, ghrepo, ghbranch):
        raise Http404;

    giraffeConfig = GiraffeProject(ghuser, ghrepo, ghbranch)
    filePath = giraffeConfig.get_tool_attribute(toolName, 'file')[0]
    params = {
        'ghuser':   ghuser,
        'ghrepo':   ghrepo,
        'ghbranch': ghbranch,
        'giraffeConfig': giraffeConfig,
        'filename': f"https://raw.githubusercontent.com/{ghuser}/{ghrepo}/{ghbranch}/{filePath}"
    }
    return TemplateResponse(request, f"{toolName}.html", params)
