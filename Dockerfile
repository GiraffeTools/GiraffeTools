FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code /code/requirements
WORKDIR /code

# Install Node.js
RUN curl -sSLO https://deb.nodesource.com/setup_9.x && \
    bash setup_9.x && \
    apt-get install nodejs && \
    rm setup_9.x && \
    npm -g install npm@6.1.0

# For Electron:
RUN apt-get install -y --no-install-recommends \
    libzmq3-dev \
    libgtk2.0-0 \
    libx11-xcb-dev \
    libxtst-dev \
    libgconf2-4 \
    libnss3-dev \
    libasound2 \
 && apt-get -yq autoremove \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install Python dependencies
ADD requirements.txt /code/
ADD requirements/base.txt /code/requirements/
RUN pip install -r requirements.txt

# Run server in docker
CMD ["bash", "/bin/docker-command.bash"]
