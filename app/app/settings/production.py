# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ['SECRET_KEY']

# optional: only needed if you run the github management commands
# Login/logout functionality will not work without defining these fields.
# Setup instructions: https://github.com/gitcoinco/web#setup-github-oauth2-app-integration

GA_ID                = os.environ['GA_ID']
GITHUB_CLIENT_ID     = os.environ['GITHUB_CLIENT_ID']
GITHUB_CLIENT_SECRET = os.environ['GITHUB_CLIENT_SECRET']
GITHUB_API_USER      = os.environ['GITHUB_API_USER']
GITHUB_API_TOKEN     = os.environ['GITHUB_API_TOKEN']
GITHUB_APP_NAME      = os.environ['GITHUB_APP_NAME']

# CodeFund
CODEFUND             = False
CODEFUND_ID          = os.environ['CODEFUND_ID']

BASE_URL = 'https://www.giraffe.tools/'

SLACK_API_TOKEN = os.environ['SLACK_API_TOKEN']


WEBPACK_LOADER = {
    'PORCUPINE': {
        'CACHE': not DEBUG,
        'BUNDLE_DIR_NAME': 'webpack_bundles/', # must end with slash
        'STATS_FILE': os.path.join(BASE_DIR, '../webpack/webpack-stats-prod.json'),
    },
    'FABRIK': {
        'CACHE': not DEBUG,
        'BUNDLE_DIR_NAME': 'webpack_bundles/', # must end with slash
        'STATS_FILE': os.path.join(BASE_DIR, '../webpack/webpack-stats-prod.json'),
    }
}
