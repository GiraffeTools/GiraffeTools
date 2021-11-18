import logging

# from django.contrib.gis.geoip2 import GeoIP2
from django.utils import timezone

# from geoip2.errors import AddressNotFoundError

from giraffe.models import UserAction, Project


logger = logging.getLogger(__name__)


def log_user_action(action, user, request):
    geolocation_data, ip_address = handle_location_request(request)

    user_is_authenticated = user.is_authenticated
    profile = user.profile if user_is_authenticated and hasattr(
        user, "profile") else None
    if user_is_authenticated and profile and profile.pk:

        profile.last_visit = timezone.now()
        profile.save()

        UserAction.objects.create(
            user=user,
            profile=profile,
            action=action,
            location_data=geolocation_data,
            ip_address=ip_address,
        )


def log_project(repo_name, user_name, user):
    Project.objects.update_or_create(
        repo_name=repo_name,
        user_name=user_name,
        user=user,
    )


def get_ip(request):
    forward_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if forward_for:
        ip_addr = forward_for.split(",")[0]
    else:
        ip_addr = request.META.get("REMOTE_ADDR")
    return ip_addr


def get_location_from_ip(ip_address):
    city = {}
    if not ip_address:
        return city

    # try:
    #     geo = GeoIP2()
    #     try:
    #         city = geo.city(ip_address)
    #     except AddressNotFoundError:
    #         pass
    # except Exception as e:
    #     logger.warning(
    #         f"Encountered ({e}) while attempting to retrieve a user\'s geolocation")  # Ignore LineLengthBear
    return city


def handle_location_request(request):
    ip_address = get_ip(request)
    geolocation_data = {}
    if ip_address:
        geolocation_data = get_location_from_ip(ip_address)
    return geolocation_data, ip_address
