from django.urls import path
from django.conf.urls import include, url

import api.views
from armadillo.api.urls import armadillo_api

api_urls = [
    path("faq_questions", api.views.faq_questions, name="faq_questions"),
    path("example_repos", api.views.example_repos, name="example_repos"),
    path("nodes", api.views.nodes, name="nodes"),
    path("push_to_github", api.views.push_to_github, name="push_to_github"),
    path("send_slack_invite",
         api.views.send_slack_invite, name="send_slack_invite"),
    path("get_user", api.views.get_user, name="get_user"),

    # api calls
    url("armadillo/", include(armadillo_api)),
    path("csrf", api.views.csrf),
    path("ping", api.views.ping),
    # path("test", api.views.test),
]
