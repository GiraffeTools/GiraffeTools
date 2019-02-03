import os
import dj_database_url

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))))

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

SETTINGS_EXPORT = [
    "GA_ID",
    "DEBUG",
]

WSGI_APPLICATION = "app.wsgi.application"

SITE_ID = 1

# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/

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

# Github
GITHUB_API_BASE_URL = "https://api.github.com"
GITHUB_AUTH_BASE_URL = "https://github.com/login/oauth/authorize"
GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token"
GITHUB_SCOPE = ["read:user", "user:email", "read:org", "public_repo"]


# Social Auth
LOGIN_URL = "login"
LOGOUT_URL = "logout"
LOGIN_REDIRECT_URL = ""
SOCIAL_AUTH_LOGIN_REDIRECT_URL = "https://giraffe.tools/_oauth/callback"
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

# Configure Django App for Heroku.
import django_heroku
django_heroku.settings(locals(), test_runner=False)
