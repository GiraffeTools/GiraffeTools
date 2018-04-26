from django.test import TestCase
from django.urls import reverse


class TestMethods(TestCase):
    def test_porcupine_url(self):
        response = self.client.get(reverse('porcupine'))
        assert response.status_code == 200
