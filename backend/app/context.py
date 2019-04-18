import json


def insert_settings(request):
    context = {
        "github_handle": request.session.get("handle", False),
        "github_email": request.session.get("email", False),
        "github_name": request.session.get("name", False),
    }
    context["json_context"] = json.dumps(context)

    return context
