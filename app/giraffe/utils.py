import json
from urllib.error import HTTPError
from urllib.request import urlopen

import pydash


def are_valid_github_details(ghuser='', ghrepo='', ghbranch='master'):
    giturl = f"https://api.github.com/repos/{ghuser}/{ghrepo}/branches"

    try:
        with urlopen(giturl) as url:
            branches = json.loads(url.read().decode())
    except HTTPError:
        return False

    return pydash.collections.reduce_(
        branches,
        lambda isValid, branchInfo:
        isValid or pydash.get(branchInfo, 'name', '') == ghbranch,
        False
    )
