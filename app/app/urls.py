"""giraffe URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf.urls import include, url
from django.urls import path
from django.contrib import admin

import giraffe.views
import armadillo.views
import porcupine.views
from api.urls import api_urls

app_name = "app"

urlpatterns = [
    # Admin calls
    url(r"^admin/?", admin.site.urls),

    # api calls
    url(r"^api/", include(api_urls)),

    # Github Integration
    path("_github/", include("oauth.urls", namespace="oauth")),

    # porcupine calls
    url(r"^porcupine/?", porcupine.views.porcupine, name="porcupine"),

    # armadillo calls
    url(r"^armadillo/?", armadillo.views.armadillo, name="armadillo"),

    # Make sure everything from the react router is used.
    # url(r"^porcupine/^(?:.*)/?$?", porcupine.views.porcupine,
    # name="porcupine"),  # Ignore LineLengthBear

    # giraffe calls
    url(r"^$", giraffe.views.index, name="index"),
    # Make sure everything from the react router is used.
    # TODO: This also makes every giraffe.tools/[rubbish] refer to the homepage.
    #      instead, return 404
    url(r"^(?:.*)/?$", giraffe.views.index, name="index"),


    # Slack
    # url(r"^slack/$", giraffe.views.slack, name="slack"),
    # url(r"^slack/thanks$", giraffe.views.slack_thanks, name="slack_thanks"),

]
