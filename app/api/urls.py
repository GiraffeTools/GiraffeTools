from django.urls import path

import api.views

api_urls = [
    path("faq_questions", api.views.faq_questions, name="faq_questions"),
    path("example_repos", api.views.example_repos, name="example_repos"),
]
