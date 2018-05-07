import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [
    # 'django.contrib.admin',
    'giraffe.apps.GiraffeConfig',
    'porcupine.apps.PorcupineConfig',
    'fabrik.apps.FabrikConfig',
    'github.apps.GithubConfig',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'app.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django_settings_export.settings_export',
                'app.context.insert_settings',
            ],
        },
    },
]

SETTINGS_EXPORT = [
    'GA_ID',
    'DEBUG',
]

WSGI_APPLICATION = 'app.wsgi.application'

SITE_ID = 1

# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        # 'ENGINE': 'django.db.backends.postgresql_psycopg2',
        # 'NAME': 'giraffe',
        # 'USER': 'admin',
        # 'PASSWORD': 'giraffe',
        # 'HOST': 'localhost',
        # 'PORT': '',
    }
}

# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/

# to be copied to:
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles/')
# to refer to:
STATIC_URL = '/static/'
# files to include:
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'assets'),
    os.path.join(BASE_DIR, '..', 'node_modules', 'bootstrap', 'dist'),
    os.path.join(BASE_DIR, '..', 'node_modules', 'jquery', 'dist'),
    os.path.join(BASE_DIR, '..', 'node_modules', 'jsplumb', 'dist'),
    os.path.join(BASE_DIR, '..', 'node_modules', 'font-proxima-nova')
)

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

# Github
GITHUB_API_BASE_URL = 'https://api.github.com'
GITHUB_AUTH_BASE_URL = 'https://github.com/login/oauth/authorize'
GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token'
GITHUB_SCOPE = 'read:user,user:email,read:org'

# Configure Django App for Heroku.
import django_heroku
django_heroku.settings(locals(), test_runner=False)
