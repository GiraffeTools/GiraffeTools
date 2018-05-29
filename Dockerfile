FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code /code/requirements
WORKDIR /code

#Install Node.js
RUN curl -sSLO https://deb.nodesource.com/setup_9.x && \
    bash setup_9.x && \
    apt-get install nodejs && \
    rm setup_9.x && \
    npm -g install npm@6.1.0

# Install Python dependencies
ADD requirements.txt /code/
ADD requirements/base.txt /code/requirements/
RUN pip install -r requirements.txt

# Run server in docker
COPY bin/docker-command.bash /bin/docker-command.bash
CMD ["bash", "/bin/docker-command.bash"]
