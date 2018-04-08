from django.template.response import TemplateResponse
from django.http import HttpResponse
from .utils.GiraffeConfig import GiraffeConfig

import pydash, urllib.error, urllib.request, yaml

def index(request):
    context = {}
    return TemplateResponse(request, 'index.html', context)

def project(request, ghuser='', ghrepo='', ghbranch='master'):
    """Recognise that this is a github repository that contains a GIRAFFE.yml file"""

    try:
        giraffeConfig = GiraffeConfig(ghuser, ghrepo, ghbranch)
    except urllib.error.HTTPError:
        giraffeConfig = None

    params = {
        'ghuser':   ghuser,
        'ghrepo':   ghrepo,
        'ghbranch': ghbranch,
        'giraffeConfig': giraffeConfig
    }

    return TemplateResponse(request, 'project.html', params)

def projectTool(request, ghuser='', ghrepo='', ghbranch='master', toolName=''):
    """Recognise that this is a github repository with GIRAFFE.yml defining this tool"""
    giraffeConfig = GiraffeConfig(ghuser, ghrepo, ghbranch)
    filename = giraffeConfig.getToolFile(toolName)
    fileData = giraffeConfig.getToolFileData(toolName)
    totalNodes = len(pydash.get(fileData, 'nodes', []))
    infoString = f"file {filename} in repository {ghrepo} contains {totalNodes} nodes"
    return HttpResponse(infoString)
