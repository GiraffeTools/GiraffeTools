FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code /code/requirements
WORKDIR /code

#Install Node.js
RUN curl -sSLO https://deb.nodesource.com/setup_8.x && \
    bash setup_8.x && \
    apt-get install nodejs && \
    rm setup_8.x

# Install Python dependencies
ADD requirements.txt /code/
RUN pip install -r requirements.txt

# Run server in docker
COPY bin/docker-command.bash /bin/docker-command.bash
CMD ["bash", "/bin/docker-command.bash"]
