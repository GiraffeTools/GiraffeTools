import unittest
from django.test import Client
from django.urls import reverse

class TestMethods(unittest.TestCase):
    def test_porcupine_url(self):
        client = Client()
        response = client.get(reverse('porcupine'))
        assert response.status_code == 200

if __name__ == '__main__':
    unittest.main()
