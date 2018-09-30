import json
from django.http import HttpResponse


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
