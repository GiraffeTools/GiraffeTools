from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 's9&vp1jq1yzr!1c_temg#v_)j-a)i5+@vbsekmi6pbjl4l1&u@'

# optional: only needed if you run the github management commands
# Login/logout functionality will not work without defining these fields.
# Setup instructions: https://github.com/gitcoinco/web#setup-github-oauth2-app-integration

GA_ID                = 'UA-XXXXXXXXX-0'
GITHUB_CLIENT_ID     = 'TODO'
GITHUB_CLIENT_SECRET = 'TODO'
GITHUB_API_USER      = 'TODO'
GITHUB_API_TOKEN     = 'TODO'
GITHUB_APP_NAME      = 'TODO'

# CodeFund
CODEFUND             = False
CODEFUND_ID          = 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'

BASE_URL = 'http://localhost:8000/'
