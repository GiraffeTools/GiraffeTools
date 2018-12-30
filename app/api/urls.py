from django.urls import path

import api.views

api_urls = [
    path("faq_questions", api.views.faq_questions, name="faq_questions"),
    path("example_repos", api.views.example_repos, name="example_repos"),
    path("nodes", api.views.nodes, name="nodes"),
    path("push_to_github", api.views.push_to_github, name="push_to_github"),
    path("send_slack_invite", api.views.send_slack_invite,
         name="send_slack_invite"),  # Ignore LineLengthBear
    path("csrf", api.views.csrf),
    path("ping", api.views.ping),
]
