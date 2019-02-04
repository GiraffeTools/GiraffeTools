from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "s9&vp1jq1yzr!1c_temg#v_)j-a)i5+@vbsekmi6pbjl4l1&u@"

# optional: only needed if you run the github management commands
# Login/logout functionality will not work without defining these fields.
# Setup instructions:
# https://github.com/gitcoinco/web#setup-github-oauth2-app-integration

GA_ID = "UA-XXXXXXXXX-0"
GITHUB_CLIENT_ID = "SECRET"
GITHUB_CLIENT_SECRET = "SECRET"
GITHUB_API_USER = "SECRET"
GITHUB_API_TOKEN = "SECRET"
GITHUB_APP_NAME = "SECRET"

# CodeFund
CODEFUND = False
CODEFUND_ID = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"

BASE_URL = "http://localhost:8000/"

# Slack
# generate legacy token here
# https://api.slack.com/custom-integrations/legacy-tokens
SLACK_API_TOKEN = ""

#
WEBPACK_LOADER = {
    "GIRAFFE": {
        "CACHE": not DEBUG,
        "BUNDLE_DIR_NAME": "webpack_bundles/",  # must end with slash
        "STATS_FILE": os.path.join(BASE_DIR, "../webpack/webpack-stats.json"),
        "POLL_INTERVAL": 0.1,
        "TIMEOUT": None,
        "IGNORE": [".+\.hot-update.js", ".+\.map"]
    },
    "ARMADILLO": {
        "CACHE": not DEBUG,
        "BUNDLE_DIR_NAME": "webpack_bundles/",  # must end with slash
        "STATS_FILE": os.path.join(BASE_DIR, "../webpack/webpack-stats.json"),
        "POLL_INTERVAL": 0.1,
        "TIMEOUT": None,
        "IGNORE": [".+\.hot-update.js", ".+\.map"]
    },
    "PORCUPINE": {
        "CACHE": not DEBUG,
        "BUNDLE_DIR_NAME": "webpack_bundles/",  # must end with slash
        "STATS_FILE": os.path.join(BASE_DIR, "../webpack/webpack-stats.json"),
        "POLL_INTERVAL": 0.1,
        "TIMEOUT": None,
        "IGNORE": [".+\.hot-update.js", ".+\.map"]
    },
}

# port 3000 hosts front-end, port 8000 hosts back-end
CORS_ORIGIN_WHITELIST = ["localhost:3000", "localhost:8000"]
CSRF_TRUSTED_ORIGINS = ["localhost:3000", "localhost:8000"]

# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "giraffetools",
        "USER": "admin",
        "PASSWORD": "giraffe",
        # This should be the name of the docker database:
        "HOST": "db",
        "PORT": "5432",
    }
}

GEOIP_PATH = "/usr/share/GeoIP/"
# GEOIP_CITY = GEOIP_PATH + "GeoLite2-City.mmdb"
# GEOIP_COUNTRY = GEOIP_PATH + "GeoLite2-Country.mmdb"

# ALLOWED_HOSTS = ["*"]
