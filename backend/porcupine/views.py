from django.shortcuts import render


def porcupine(request):
    return render(request, "porcupine.html")
