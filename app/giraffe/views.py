from django.shortcuts import render


def giraffe(request):
    return render(request, "giraffe.html")
