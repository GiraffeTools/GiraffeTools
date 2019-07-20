import os
from kubernetes import client, config

from django.shortcuts import render


def axolotl(request):
    try:
        creds_file = os.path.abspath("/code/axolotl/creds/google_creds.json")
        config_file = os.path.abspath("/code/axolotl/config/kube_config.yml")

        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = creds_file
        kube_config = config.load_kube_config(config_file=config_file)

        apiClient = client.ApiClient(kube_config)
        k8s_api = client.CoreV1Api(apiClient)
        print("Listing pods with their IPs:")
        ret = k8s_api.list_pod_for_all_namespaces(watch=False)
        for i in ret.items:
            print("%s\t%s\t%s" %
                  (i.status.pod_ip, i.metadata.namespace, i.metadata.name))
    except Exception as error:
        print(error)
        print("Kubernetes not set up")

    return render(request, "axolotl.html")
