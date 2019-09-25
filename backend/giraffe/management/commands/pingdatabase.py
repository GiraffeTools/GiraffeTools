import os
import socket
import time
import sys

from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Check if the database is up and running"

    def handle(self, *args, **options):
        POSTGRES_HOST = os.getenv("POSTGRES_HOST", "database"),
        POSTGRES_PORT = os.getenv("POSTGRES_PORT", 5432),

        for second in range(0, 60):
            try:
                s = socket.create_connection(
                    (POSTGRES_HOST[0], POSTGRES_PORT[0]), 1)
                s.close()
                self.stdout.write(self.style.SUCCESS(
                    "Successfully reached database"))
                return
            except _:
                self.stdout.write(self.style.WARNING(
                    "No luck after %d seconds" % second))
                self.stdout.write(self.style.WARNING(
                    "Can't detect the postgres server. "
                    "Trying again in a second"))

                time.sleep(1)

        # crash:
        sys.exit(1)
