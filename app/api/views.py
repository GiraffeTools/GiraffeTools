import json
import requests
from slackclient import SlackClient
from django.http import HttpResponse
from django.conf import settings
from rest_framework import status

from github.views import logged_in
from github.utils import is_github_token_valid

sc = SlackClient(settings.SLACK_API_TOKEN)


def faq_questions(request):
    # with open(static("misc/faq_questions.json")) as f:
    with open("staticfiles/misc/faq_questions.json") as f:
        questions = json.load(f)

    return HttpResponse(json.dumps(questions), content_type="application/json")


def example_repos(request):
    # with open(static("misc/examples.json")) as f:
    with open("staticfiles/misc/examples.json") as f:
        questions = json.load(f)

    return HttpResponse(json.dumps(questions), content_type="application/json")


def nodes(request):

    with open("staticfiles/assets/nipype.json") as f:
        nodes = json.load(f)
    return HttpResponse(json.dumps(nodes), content_type="application/json")


def push_to_github(request):
    body = json.loads(request.body)
    user = body["user"]
    repo = body["repository"]
    filename = body["filename"]
    branch = body["branch"]
    commit_message = body["message"]
    content = body["content"]

    # Clearly it should only do this on your own repo when you're logged in...
    logged_in_user = logged_in(request)
    github_user = json.loads(logged_in_user.content)

    if (github_user["github_handle"] != user or
            not is_github_token_valid(github_user["access_token"])):
        response = {}
        return HttpResponse(response, content_type="application/json")

    url = f"https://api.github.com/repos/{user}/{repo}/contents/{filename}"

    token = settings.GITHUB_API_TOKEN
    headers = {"Authorization": "token " + token}
    data = requests.get(f"{url}?ref={branch}", headers=headers).json()
    # #TODO: commit conditionally on contents being different
    # if body["content"] + "\n" != data['content']:
    message = json.dumps({
        "message": commit_message,
        "branch": branch,
        "content": content,
        "sha": data["sha"]
    })
    headers["Content-Type"] = "application/json"
    response = requests.put(url, data=message, headers=headers)

    return HttpResponse(response, content_type="application/json")


def send_slack_invite(request):
    body = json.loads(request.body)
    email = body["email"]
    sc.api_call("users.admin.invite", email=email)

    return HttpResponse(status=status.HTTP_200_OK)
