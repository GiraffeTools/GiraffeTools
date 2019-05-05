import json
import logging
import os
from github import Github, InputGitTreeElement
from slackclient import SlackClient
from django.conf import settings
from django.http import HttpResponse, HttpResponseForbidden, JsonResponse
from django.http import HttpResponseForbidden
from django.middleware.csrf import get_token

from oauth.utils import is_github_token_valid

from giraffe.utils import log_user_action, log_project

logger = logging.getLogger(__name__)
sc = SlackClient(settings.SLACK_API_TOKEN)


def faq_questions(request):
    url = os.path.join(settings.STATIC_ROOT, "misc/faq_questions.json")
    with open(url) as f:
        questions = json.load(f)

    return HttpResponse(json.dumps(questions), content_type="application/json")


def example_repos(request):
    url = os.path.join(settings.STATIC_ROOT, "misc/examples.json")
    with open(url) as f:
        questions = json.load(f)

    return HttpResponse(json.dumps(questions), content_type="application/json")


def nodes(request):
    url = os.path.join(settings.STATIC_ROOT, "assets/toolboxes.json")
    with open(url) as f:
        nodes = json.load(f)
    return HttpResponse(json.dumps(nodes), content_type="application/json")


def get_user(request):
    user = request.user
    profile = {}
    if user and user.is_authenticated:
        try:
            user_profile = user.profile
            # profile["github_email"] = user_profile.handle
            profile["github_name"] = user_profile.handle
            profile["github_handle"] = user_profile.handle
            profile["access_token"] = user.social_auth.filter(
                provider="github").latest("pk").access_token
        except Exception as e:
            logger.exception(e)

    return JsonResponse(profile)


def push_to_github(request):
    body = json.loads(request.body)

    user_name = body["user"]
    repo_name = body["repository"]
    branch = body["branch"]
    commit_message = body["message"]
    contents = body["contents"]

    try:
        user = request.user
        user_profile = user.profile
        handle = user_profile.handle
        access_token = user.social_auth.filter(
            provider="github").latest("pk").access_token
    except Exception as e:
        logger.exception(e)
        return HttpResponseForbidden()

    if (handle != user_name or
            not is_github_token_valid(access_token)):
        return HttpResponseForbidden()

    g = Github(access_token)
    element_list = list()
    for key, value in contents.items():
        file_code = "100644"
        element = InputGitTreeElement(key, file_code, "blob", value)
        element_list.append(element)

    repo = g.get_repo(f"{user_name}/{repo_name}")
    try:
        master_ref = repo.get_git_ref(f"heads/{branch}")
    except Exception as e:
        # with a bit of luck, the reason is that there is no first commit yet
        # TODO: code this up more cleanly. The create_file solution is a hack
        repo.create_file("README.md", "Initial commit", "")
        master_ref = repo.get_git_ref(f"heads/{branch}")

    master_sha = master_ref.object.sha
    base_tree = repo.get_git_tree(master_sha)

    tree = repo.create_git_tree(element_list, base_tree)
    parent = repo.get_git_commit(master_sha)
    commit = repo.create_git_commit(commit_message, tree, [parent])
    master_ref.edit(commit.sha)

    if master_ref.object.sha == commit.sha:
        log_user_action("Commit", user, request)
        log_project(repo_name, user_name, user)

        return HttpResponse(status=200, content_type="application/json")
    else:
        return HttpResponse(status=400, content_type="application/json")


def send_slack_invite(request):
    body = json.loads(request.body)
    email = body["email"]
    slack_answer = sc.api_call("users.admin.invite", email=email)
    return HttpResponse(json.dumps(slack_answer),
                        content_type="application/json")


def csrf(request):
    return JsonResponse({"csrfToken": get_token(request)})


def ping(request):
    # With a POST request, this fails if the CSRFToken is not set
    return JsonResponse({"result": "OK"})
