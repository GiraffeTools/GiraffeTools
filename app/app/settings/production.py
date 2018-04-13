from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ['SECRET_KEY']

# optional: only needed if you run the github management commands
# Login/logout functionality will not work without defining these fields.
# Setup instructions: https://github.com/gitcoinco/web#setup-github-oauth2-app-integration
GITHUB_CLIENT_ID = 'TODO'
GITHUB_CLIENT_SECRET = 'TODO'
GITHUB_API_USER = 'TODO'
GITHUB_API_TOKEN = 'TODO'
GITHUB_APP_NAME = 'TODO'
