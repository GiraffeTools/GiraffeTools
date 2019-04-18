FROM python:3
LABEL maintainer="timvanmourik@gmail.com"

ENV PYTHONUNBUFFERED 1
RUN mkdir /code /code/requirements
WORKDIR /code

# GeoIP2 Data Files
RUN mkdir -p /usr/share/GeoIP/ && \
    wget http://geolite.maxmind.com/download/geoip/database/GeoLite2-City.mmdb.gz && \
    wget http://geolite.maxmind.com/download/geoip/database/GeoLite2-Country.mmdb.gz && \
    gunzip GeoLite2-City.mmdb.gz && \
    gunzip GeoLite2-Country.mmdb.gz && \
    mv *.mmdb /usr/share/GeoIP/

# Install Python dependencies
COPY requirements.txt /code/
COPY requirements/base.txt /code/requirements/
RUN pip install -r requirements.txt

EXPOSE 8000
