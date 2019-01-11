import json
import github
from slackclient import SlackClient
from django.conf import settings
from django.http import HttpResponse, HttpResponseForbidden, JsonResponse
from django.http import HttpResponseForbidden
from django.middleware.csrf import get_token

from oauth.views import logged_in
from oauth.utils import is_github_token_valid

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

    user_name = body["user"]
    repo_name = body["repository"]
    branch = body["branch"]
    commit_message = body["message"]
    contents = body["contents"]

    logged_in_user = logged_in(request)
    github_user = json.loads(logged_in_user.content)
    if (github_user["github_handle"] != user_name or
            not is_github_token_valid(github_user["access_token"])):
        return HttpResponseForbidden()

    g = github.Github(github_user["access_token"])
    element_list = list()
    for key, value in contents.items():
        file_code = "100644"
        element = github.InputGitTreeElement(key, file_code, "blob", value)
        element_list.append(element)

    repo = g.get_repo(f"{user_name}/{repo_name}")
    try:
        master_ref = repo.get_git_ref(f"heads/{branch}")
    except:  # Ignore PycodestyleBear (E722)
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
