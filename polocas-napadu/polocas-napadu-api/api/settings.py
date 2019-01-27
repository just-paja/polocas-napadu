"""
Django settings for api project.

Generated by 'django-admin startproject' using Django 2.1.4.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

# noqa

import os
import sentry_sdk

from sentry_sdk.integrations.django import DjangoIntegration
from django.utils.translation import gettext_lazy as _


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'w@6p6z=)+k-%ft55-)!yvuptvzda63@#aj^m5q&_x87ddd62el' # noqa

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    'corsheaders',
    'colorfield',
    'locations.LocationsConfig',
    'bands.BandsConfig',
    'profiles.ProfilesConfig',
    'shows.ShowsConfig',
    'inspirations.InspirationsConfig',
    'games.GamesConfig',
    'theatre_sports.TheatreSportsConfig',
    'management',
    'graphene_django',
    'admin_sso',
    'gsuite.GSuiteConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.locale.LocaleMiddleware',
]

ROOT_URLCONF = 'api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'api.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

LANGUAGES = [
    ('cs', _('Czech')),
    ('en', _('English')),
]

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL = '/static/'

GRAPH_MODELS = {
    'all_applications': True,
    'group_models': True,
}

GRAPHENE = {
    'SCHEMA': 'api.schema.PUBLIC',
}

LOCALE_PATHS = [
    os.path.join(BASE_DIR, 'locale'),
    os.path.join(BASE_DIR, 'bands/locale'),
    os.path.join(BASE_DIR, 'events/locale'),
    os.path.join(BASE_DIR, 'fields/locale'),
    os.path.join(BASE_DIR, 'locations/locale'),
    os.path.join(BASE_DIR, 'photos/locale'),
    os.path.join(BASE_DIR, 'profiles/locale'),
    os.path.join(BASE_DIR, 'shows/locale'),
]

if DEBUG:
    MEDIA_ROOT = '/var/tmp/polocas-napadu-api'
    MEDIA_URL = '/media/'

RAVEN_DSN = None
EMAIL_MANAGER = 'test@example.com'

AWS_ACCESS_KEY_ID = None
AWS_SECRET_ACCESS_KEY = None
AWS_STORAGE_BUCKET_NAME = None
AWS_S3_REGION_NAME = None
AWS_QUERYSTRING_AUTH = False
AWS_DEFAULT_ACL = 'public-read'
AWS_S3_FILE_OVERWRITE = False

DJANGO_ADMIN_SSO = False
DJANGO_ADMIN_SSO_OAUTH_CLIENT_ID = None
DJANGO_ADMIN_SSO_OAUTH_CLIENT_SECRET = None

CORS_ORIGIN_WHITELIST = (
    '127.0.0.1',
    'localhost:3000',
    'localhost:8000',
    'localhost:8080',
)

try:
    # pylint: disable=wildcard-import
    from local_settings import * # noqa
except ImportError:
    pass

if AWS_ACCESS_KEY_ID and AWS_STORAGE_BUCKET_NAME:
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

if RAVEN_DSN:
    sentry_sdk.init(
        dsn=RAVEN_DSN,
        integrations=[DjangoIntegration()]
    )

if (
    DJANGO_ADMIN_SSO_OAUTH_CLIENT_ID
    and DJANGO_ADMIN_SSO_OAUTH_CLIENT_SECRET
):
    DJANGO_ADMIN_SSO = True
    AUTHENTICATION_BACKENDS = (
        'gsuite.auth.GsuiteAuthBackend',
        'django.contrib.auth.backends.ModelBackend',
    )

if AWS_ACCESS_KEY_ID:
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    DBBACKUP_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    DBBACKUP_STORAGE_OPTIONS = {
        'access_key': AWS_ACCESS_KEY_ID,
        'secret_key': AWS_SECRET_ACCESS_KEY,
        'bucket_name': AWS_STORAGE_BUCKET_NAME,
    }
