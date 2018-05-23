from unittest import mock
from urllib.error import HTTPError

from django.test import TestCase, Client
from django.urls import reverse

from giraffe.views import index

class TestViewsIndex(TestCase):

    def test_without_login(self):
        response = self.client.get(reverse('index'))

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')

        self.assertContains(response, "Login")
        self.assertNotContains(response, "(LogOut)")

        self.assertContains(response, 'placeholder=@you (optional) value=""')

        self.assertContains(response, "Giraffe")
        self.assertContains(response, "Porcupine")
        self.assertContains(response, "Get started!")

    def test_with_login(self):
        handle = '@timvanmourik'

        session = self.client.session
        session['handle'] = handle
        session.save()

        response = self.client.get(reverse('index'))

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')

        self.assertNotContains(response, "Login")
        self.assertContains(response, "(LogOut)")

        self.assertContains(response, f'value="{handle}')

        self.assertContains(response, "Giraffe")
        self.assertContains(response, "Porcupine")
        self.assertContains(response, "Get started!")
