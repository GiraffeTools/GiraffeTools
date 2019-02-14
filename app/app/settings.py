import os
import dj_database_url


# string comparison because environment vraiable is string
DEBUG = os.getenv("DEBUG", "True") == "True"

default_secret_key = "s9&vp1jq1yzr!1c_temg#v_)j-a)i5+@vbsekmi6pbjl4l1&u@"
SECRET_KEY = os.getenv("SECRET_KEY", default_secret_key)

BASE_URL = "http://localhost:8000/" if not DEBUG else "https://giraffe.tools/"
ALLOWED_HOSTS = [BASE_URL, "localhost", "127.0.0.1",
                 os.getenv("ALLOWED_HOSTS", None)]

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "giraffe.apps.GiraffeConfig",
    "armadillo.apps.ArmadilloConfig",
    "porcupine.apps.PorcupineConfig",
    "oauth.apps.OAuthConfig",
    "livereload",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "social_django",
    "corsheaders",
    "webpack_loader",
    "sass_processor",
]

AUTHENTICATION_BACKENDS = (
    "social_core.backends.github.GithubOAuth2",
    "django.contrib.auth.backends.ModelBackend",
)

SOCIAL_AUTH_POSTGRES_JSONFIELD = True

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "livereload.middleware.LiveReloadScript",
]

ROOT_URLCONF = "app.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "django_settings_export.settings_export",
                "social_django.context_processors.backends",
                "social_django.context_processors.login_redirect",
                "app.context.insert_settings",
            ],
        },
    },
]

DATABASES = {}
if os.getenv("HEROKU", "False") == "True":
    DATABASES["default"] = dj_database_url.config(
        conn_max_age=600, ssl_require=True)
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql_psycopg2",
            "HOST": os.getenv("POSTGRES_HOST", "db"),
            "PORT": os.getenv("POSTGRES_PORT", 5432),
            "NAME": os.getenv("POSTGRES_DB", "giraffetools"),
            "USER": os.getenv("POSTGRES_USER", "admin"),
            "PASSWORD": os.getenv("POSTGRES_PASSWORD", "giraffe"),
        }
    }


SETTINGS_EXPORT = [
    "GA_ID",
    "DEBUG",
]

WSGI_APPLICATION = "app.wsgi.application"

SITE_ID = 1

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation."
                "UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation."
                "MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation."
                "CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation."
                "NumericPasswordValidator",
    },
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)

# to be copied to:
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles/")

# to refer to:
STATIC_URL = "/static/"

# files to include:
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "assets"),
)
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

STATICFILES_FINDERS = [
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
    "sass_processor.finders.CssFinder",
]

MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = "/media/"

ADMINS = [("admin", os.getenv("ADMIN_EMAIL"))]
GA_ID = os.getenv("GA_ID", "UA-XXXXXXXXX-0")


# Github
GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID", "SECRET")
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET", "SECRET")
GITHUB_API_USER = os.getenv("GITHUB_API_USER", "SECRET")
GITHUB_API_TOKEN = os.getenv("GITHUB_API_TOKEN", "SECRET")
GITHUB_APP_NAME = os.getenv("GITHUB_APP_NAME", "SECRET")
SOCIAL_AUTH_GITHUB_KEY = GITHUB_CLIENT_ID
SOCIAL_AUTH_GITHUB_SECRET = GITHUB_CLIENT_SECRET
GITHUB_API_BASE_URL = "https://api.github.com"
GITHUB_AUTH_BASE_URL = "https://github.com/login/oauth/authorize"
GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token"
GITHUB_SCOPE = ["read:user", "user:email", "read:org", "public_repo"]


# Social Auth
LOGIN_URL = "login"
LOGOUT_URL = "logout"
LOGIN_REDIRECT_URL = ""
SOCIAL_AUTH_LOGIN_REDIRECT_URL = "https://giraffe.tools/_oauth/callback/"
SOCIAL_AUTH_POSTGRES_JSONFIELD = True
SOCIAL_AUTH_ADMIN_USER_SEARCH_FIELDS = [
    "username", "first_name", "last_name", "email"]
SOCIAL_AUTH_GITHUB_SCOPE = GITHUB_SCOPE

SOCIAL_AUTH_PIPELINE = (
    "social_core.pipeline.social_auth.social_details",
    "social_core.pipeline.social_auth.social_uid",
    "social_core.pipeline.social_auth.auth_allowed",
    "social_core.pipeline.social_auth.social_user",
    "social_core.pipeline.user.get_username",
    "social_core.pipeline.user.create_user",
    "app.pipeline.save_profile",
    "social_core.pipeline.social_auth.associate_user",
    "social_core.pipeline.social_auth.load_extra_data",
    "social_core.pipeline.user.user_details",
)

# Slack
# generate legacy token here
# https://api.slack.com/custom-integrations/legacy-tokens
SLACK_API_TOKEN = os.getenv("SLACK_API_TOKEN", "")

# localisation, potential replacement for Google Analytics
GEOIP_PATH = os.getenv("GEOIP_GEOLITE2_PATH", "/usr/share/GeoIP/")
# GEOIP_CITY = GEOIP_PATH + "GeoLite2-City.mmdb"
# GEOIP_COUNTRY = GEOIP_PATH + "GeoLite2-Country.mmdb"


# Ignore LineLengthBear
stats_file = "../webpack/webpack-stats.json" if DEBUG else "../webpack/webpack-stats-prod.json"
webpack_config = {
    "CACHE": not DEBUG,
    "BUNDLE_DIR_NAME": "webpack_bundles/",  # must end with slash
    "STATS_FILE": os.path.join(BASE_DIR, stats_file),
    "POLL_INTERVAL": 0.1,  # unused in prodcution mode
    "TIMEOUT": None,
    "IGNORE": [".+\.hot-update.js", ".+\.map"]
}

WEBPACK_LOADER = {
    "GIRAFFE": webpack_config,
    "ARMADILLO": webpack_config,
    "PORCUPINE": webpack_config,
}

# port 3000 hosts front-end, port 8000 hosts back-end
CORS_ORIGIN_WHITELIST = ["localhost:3000",
                         "localhost:8000"] if DEBUG else ["giraffe.tools"]
CSRF_TRUSTED_ORIGINS = ["localhost:3000",
                        "localhost:8000"] if DEBUG else ["giraffe.tools"]
