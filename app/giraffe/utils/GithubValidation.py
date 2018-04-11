import json, pydash, urllib.error, urllib.request

def isValidSetOfGithubDetails(ghuser='', ghrepo='', ghbranch='master'):
    giturl = f"https://api.github.com/repos/{ghuser}/{ghrepo}/branches"

    try:
        with urllib.request.urlopen(giturl) as url:
            branches = json.loads(url.read().decode())
    except urllib.error.HTTPError:
        return False

    return pydash.collections.reduce_(
        branches,
        lambda isValid, branchInfo:
            isValid or pydash.get(branchInfo, 'name', '') == ghbranch,
        False
    )
