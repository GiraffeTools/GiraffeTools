import os
from kubernetes import client, config

from django.shortcuts import render


def axolotl(request):
    try:
        creds_file = os.path.abspath("/code/axolotl/creds/google_creds.json")
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = creds_file

        kube_config = config.load_kube_config(
            config_file=os.path.abspath("/code/axolotl/config/kube_config.yml"))
        aApiClient = client.ApiClient(kube_config)

        v1 = client.CoreV1Api(aApiClient)
        print("Listing pods with their IPs:")
        ret = v1.list_pod_for_all_namespaces(watch=False)
        for i in ret.items:
            print("%s\t%s\t%s" %
                  (i.status.pod_ip, i.metadata.namespace, i.metadata.name))
    except error:
        print("Kubernetes not set up")

    return render(request, "axolotl.html")
