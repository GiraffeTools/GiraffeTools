from django.template.response import TemplateResponse
from django.http import HttpResponse, Http404
from .utils.GiraffeConfig import GiraffeConfig
from .utils.GithubValidation import isValidSetOfGithubDetails

import pydash, urllib.error, urllib.request, yaml

def index(request):
    context = {}
    return TemplateResponse(request, 'index.html', context)

def project(request, ghuser='', ghrepo='', ghbranch='master'):
    """Recognise that this is a github repository that contains a GIRAFFE.yml file"""

    if not isValidSetOfGithubDetails(ghuser, ghrepo, ghbranch):
        raise Http404;

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

    if not isValidSetOfGithubDetails(ghuser, ghrepo, ghbranch):
        raise Http404;

    giraffeConfig = GiraffeConfig(ghuser, ghrepo, ghbranch)
    filename = giraffeConfig.getToolAttribute(toolName, 'file')[0]
    fileData = giraffeConfig.getToolFileData(toolName)
    totalNodes = len(pydash.get(fileData, 'nodes', []))
    infoString = f"file {filename} in repository {ghrepo} contains {totalNodes} nodes"

    return HttpResponse(infoString)

    # @TODO create a template response from the tools and pass on the fileData
    # params = {
    #     'ghuser':   ghuser,
    #     'ghrepo':   ghrepo,
    #     'ghbranch': ghbranch,
    #     'giraffeConfig': giraffeConfig
    # }
    # return TemplateResponse(request, f"{toolName}.html", params)
