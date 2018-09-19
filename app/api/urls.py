from django.urls import path

import api.views

api_urls = [
    path("faq_questions", api.views.faq_questions, name="faq_questions"),
]
