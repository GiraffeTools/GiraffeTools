FROM python:3
LABEL maintainer="timvanmourik@gmail.com"

ENV PYTHONUNBUFFERED 1

# GeoIP2 Data Files
RUN mkdir -p /usr/share/GeoIP/ && \
    wget http://geolite.maxmind.com/download/geoip/database/GeoLite2-City.mmdb.gz && \
    wget http://geolite.maxmind.com/download/geoip/database/GeoLite2-Country.mmdb.gz && \
    gunzip GeoLite2-City.mmdb.gz && \
    gunzip GeoLite2-Country.mmdb.gz && \
    mv *.mmdb /usr/share/GeoIP/

#Install Node.js
RUN curl -sSLO https://deb.nodesource.com/setup_9.x && \
    bash setup_9.x && \
    apt-get install nodejs && \
    rm setup_9.x && \
    npm -g install npm@6.7.0

RUN mkdir /code
RUN git clone https://github.com/TimVanMourik/GiraffeTools.git /code
WORKDIR /code

# Install Python dependencies
RUN pip install -r requirements.txt
