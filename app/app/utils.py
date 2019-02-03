import logging
from django.contrib.auth.models import User

from oauth.utils import get_github_user
from giraffe.models import Profile


logger = logging.getLogger(__name__)


def sync_profile(handle, user=None):
    handle = handle.strip().replace("@", "")
    data = get_github_user(handle)
    email = ""
    is_error = "name" not in data.keys()
    if is_error:
        logger.warning("Failed to fetch github username",
                       exc_info=True, extra={"handle": handle})
        return None

    defaults = {}
    if user and isinstance(user, User):
        defaults["user"] = user
        try:
            # defaults['github_access_token'] = user.social_auth.filter(provider='github').latest('pk').access_token
            if user and user.email:
                defaults["email"] = user.email
        except UserSocialAuth.DoesNotExist:
            pass

    try:
        profile, created = Profile.objects.update_or_create(
            handle=handle, defaults=defaults)
        profile.save()

    except Exception as e:
        logger.error(e)
        return None

    if user and user.email:
        email = user.email
    elif profile and profile.email:
        email = profile.email

    return profile
