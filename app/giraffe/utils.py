import json
from urllib.error import HTTPError
from urllib.request import urlopen

from django.conf import settings

import pydash
from slackclient import SlackClient


sc = SlackClient(settings.SLACK_API_TOKEN)


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


def send_slack_invitation_to_email(email):
    sc.api_call('users.admin.invite', email=email)
