from django.shortcuts import render


def armadillo(request):
    return render(request, "armadillo.html")
