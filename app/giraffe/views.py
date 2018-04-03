from django.template.response import TemplateResponse


def index(request):
    context = {}
    return TemplateResponse(request, 'index.html', context)
