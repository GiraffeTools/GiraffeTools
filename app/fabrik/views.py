import os
from django.shortcuts import render
from django.conf import settings

def fabrik(request):
    if not settings.DEBUG:
        raise Http404;

    return render(request, 'fabrik/index.html')
