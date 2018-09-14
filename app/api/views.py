import json
from django.http import HttpResponse
from django.contrib.staticfiles.templatetags.staticfiles import static

def faq_questions(request):
    # with open(static("misc/faq_questions.json")) as f:
    with open("staticfiles/misc/faq_questions.json") as f:
        questions = json.load(f)

    return HttpResponse(json.dumps(questions), content_type="application/json")
