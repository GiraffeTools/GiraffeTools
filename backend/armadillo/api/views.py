from django.core.files.base import ContentFile
from urllib.request import urlopen
import urllib
import urllib.request
import json
import base64
import os
from django.http import HttpResponse
from django.conf import settings
from nibabel.gifti.parse_gifti_fast import GiftiImageParser
from nibabel.freesurfer import io as fsio

from .utils import create_qr_from_text, put_qr_on_marker, color_func, \
    fv_scalar_to_collada


def qr(request, image=""):
    qr_link = os.path.join(settings.BASE_URL, "neurovault/" + image)
    marker_with_qr = put_qr_on_marker(
        qr_link, os.path.join(settings.STATIC_ROOT, "img/marker.png"))

    # Ignore PycodestyleBear (E303)  # Ignore LineLengthBear
    image = ContentFile(base64.b64decode(marker_with_qr), name="temp.jpg")
    return HttpResponse(image, content_type="image/jpeg")


def hemisphere(request, image="", hemisphere=""):
    fileUrl = f"https://neurovault.org/api/images/{image}"
    try:
        with urllib.request.urlopen(fileUrl) as url:
            fileData = json.loads(url.read().decode())
    except (urllib.error.HTTPError, ValueError):
        fileData = None

    # Map external file to internal file:
    surface_file = fileData[f"surface_{hemisphere}_file"]
    giftiParser = GiftiImageParser(buffer_size=35000000)
    giftiParser.parse(string=urlopen(surface_file).read())
    giftiObject = giftiParser.img
    colors = giftiObject.darrays[0].data

    if hemisphere not in ["left", "right"]:
        exit(1)
    elif hemisphere == "left":
        hemi_short = "lh"
    else:
        hemi_short = "rh"

    fs_base = os.path.join(settings.STATIC_ROOT, "fs/")
    verts, faces = fsio.read_geometry(
        os.path.join(fs_base, "%s.pial" % hemi_short))

    bytestream = bytes(fv_scalar_to_collada(verts, faces, colors).getvalue())
    filename = f"{hemisphere}.dae"
    file = ContentFile(bytestream, filename)
    response = HttpResponse(file, content_type="application/xml")
    response["Content-Disposition"] = "attachment; filename=" + filename
    return response
