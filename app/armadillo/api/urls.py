from django.urls import path

import armadillo.api.views

armadillo_api = [
    path("neurovault/<slug:image>/qr",
         armadillo.api.views.qr, name="qr"),
    path("neurovault/<slug:image>/models/<slug:hemisphere>",
         armadillo.api.views.hemisphere, name="hemisphere"),
]
