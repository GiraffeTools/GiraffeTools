from django.template.response import TemplateResponse
import urllib.request, json 


def index(request):
    context = {}
    return TemplateResponse(request, 'index.html', context)

def project(request, ghuser='', ghrepo='', ghbranch=0):
    """Recognise that this is a github repository that contains a GIRAFFE.yml file"""
    
    giturl = f"https://api.github.com/repos/{ghuser}/{ghrepo}/git/trees/{ghbranch}?recursive=1"
    with urllib.request.urlopen(giturl) as url:
        tree = json.loads(url.read().decode()).get("tree")

    contain = False
    
    for f in tree:
        path = f.get("path")
        if "GIRAFFE.yml" in path and "app" not in path and "index" not in path and "about" not in path:
            contain = True
            break
    
    params = {
        'ghuser': ghuser,
        'ghrepo': ghrepo,
        'ghbranch': ghbranch,
        'contain': contain
    }

    return TemplateResponse(request, 'project.html', params)