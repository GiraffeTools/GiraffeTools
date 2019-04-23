import os
import environ
import dj_database_url

root = environ.Path(__file__) - 2
env = environ.Env(DEBUG=(bool, False),)
env.read_env(str(root.path(".env")))  # reading .env file

SITE_ROOT = root()

DEBUG = env.bool("DEBUG", default=True)

default_secret_key = "s9&vp1jq1yzr!1c_temg#v_)j-a)i5+@vbsekmi6pbjl4l1&u@"
SECRET_KEY = env.str("SECRET_KEY", default=default_secret_key)


BASE_URL = "https://giraffe.tools/" if not DEBUG else "http://localhost:8000/"
ALLOWED_HOSTS = ["www.giraffe.tools", "giraffe.tools", "localhost", "127.0.0.1",
                 os.getenv("ALLOWED_HOSTS", None), "*"]

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
    "health_check",                             # required
    "health_check.db",                          # stock Django health checkers
    "health_check.cache",
    "health_check.storage",
    # 'health_check.contrib.celery',              # requires celery
    # disk and memory utilization; requires psutil
    "health_check.contrib.psutil",
    # 'health_check.contrib.s3boto_storage',      # requires boto and S3BotoStorage backend  # Ignore LineLengthBear
    # 'health_check.contrib.rabbitmq',            # requires RabbitMQ broker
]

HEALTH_CHECK = {
    "DISK_USAGE_MAX": 90,  # percent
    "MEMORY_MIN": 100,    # in MB
}

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

HEROKU = env.bool("HEROKU", default=False)
if HEROKU:
    DATABASES["default"] = dj_database_url.config(
        conn_max_age=600, ssl_require=True)
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql_psycopg2",
            "HOST": os.getenv("POSTGRES_HOST", "database"),
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


public_root = root.path("public/")

MEDIA_ROOT = public_root("media")
MEDIA_URL = "/media/"
# internal reference:
STATIC_ROOT = public_root("static")
# external reference
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

# MEDIA_ROOT = os.path.join(BASE_DIR, "media")
# MEDIA_URL = "/media/"

ADMINS = [("admin", os.getenv("ADMIN_EMAIL"))]
GA_ID = os.getenv("GA_ID", "UA-XXXXXXXXX-0")


# Github
GITHUB_CLIENT_ID = env.str("GITHUB_CLIENT_ID", default="SECRET")
GITHUB_CLIENT_SECRET = env.str("GITHUB_CLIENT_SECRET", default="SECRET")
GITHUB_API_USER = env.str("GITHUB_API_USER", default="SECRET")
GITHUB_API_TOKEN = env.str("GITHUB_API_TOKEN", default="SECRET")
GITHUB_APP_NAME = env.str("GITHUB_APP_NAME", default="SECRET")
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
SLACK_API_TOKEN = env.str("SLACK_API_TOKEN", default="")

# localisation, potential replacement for Google Analytics
GEOIP_PATH = env.str("GEOIP_PATH", default="/usr/share/GeoIP/")
# GEOIP_CITY = GEOIP_PATH + "GeoLite2-City.mmdb"
# GEOIP_COUNTRY = GEOIP_PATH + "GeoLite2-Country.mmdb"


# Ignore LneLengthBear
WEBPACK_FOLDER = env.str("WEBPACK_FOLDER", default="/webpack/")
webpack_config = {
    "CACHE": not DEBUG,
    "BUNDLE_DIR_NAME": "webpack_bundles/",  # must end with slash
    "STATS_FILE": os.path.join(WEBPACK_FOLDER, "webpack-stats.json"),
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

# if DEBUG or os.getenv("LOGGING", "False") == "True":
if True:
    LOGGING = {
        "version": 1,
        "disable_existing_loggers": False,
        "filters": {
            "require_debug_false": {
                "()": "django.utils.log.RequireDebugFalse",
            },
            "require_debug_true": {
                "()": "django.utils.log.RequireDebugTrue",
            },
        },
        "formatters": {
            "django.server": {
                "()": "django.utils.log.ServerFormatter",
                "format": "[%(server_time)s] %(message)s",
            }
        },
        "handlers": {
            "console": {
                "level": "INFO",
                "filters": ["require_debug_true"],
                "class": "logging.StreamHandler",
            },
            "console_debug_false": {
                "level": "ERROR",
                "filters": ["require_debug_false"],
                "class": "logging.StreamHandler",
            },
            "django.server": {
                "level": "INFO",
                "class": "logging.StreamHandler",
                "formatter": "django.server",
            },
            "mail_admins": {
                "level": "ERROR",
                "filters": ["require_debug_false"],
                "class": "django.utils.log.AdminEmailHandler"
            }
        },
        "loggers": {
            "django": {
                "handlers": ["console", "console_debug_false", "mail_admins"],
                "level": "INFO",
            },
            "django.server": {
                "handlers": ["django.server"],
                "level": "INFO",
                "propagate": False,
            }
        }
    }


# CACHE_URL=memcache://127.0.0.1:11211,127.0.0.1:11212,127.0.0.1:11213
# REDIS_URL=rediscache://127.0.0.1:6379/1?client_class=django_redis.client.DefaultClient&password=redis-un-githubbed-password
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.memcached.MemcachedCache",
        "LOCATION": [
            "127.0.0.1:11211", "127.0.0.1:11212", "127.0.0.1:11213",
        ]
    },
    "redis": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "127.0.0.1:6379/1",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "PASSWORD": "redis-githubbed-password",
        }
    }
}
