FROM debian:stretch

ARG DEBIAN_FRONTEND="noninteractive"

RUN apt-get update -qq && \
    apt-get install -y -q --no-install-recommends \
       apt-utils \
       bzip2 \
       ca-certificates \
       curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    curl -sSLO https://repo.continuum.io/miniconda/Miniconda3-4.3.11-Linux-x86_64.sh && \
    bash Miniconda3-4.3.11-Linux-x86_64.sh -b -p /usr/local/miniconda && \
    rm Miniconda3-4.3.11-Linux-x86_64.sh

ENV PATH=/usr/local/miniconda/bin:$PATH \
    LANG=C.UTF-8 \
    LC_ALL=C.UTF-8

# Installing precomputed python packages
RUN conda install -y traits 

RUN chmod +x /usr/local/miniconda/bin/* && conda clean --all -y
RUN echo 'export PATH=/usr/local/miniconda/bin:$PATH' >> /etc/profile
RUN pip install nipype>=1.1.8
RUN apt-get update && apt-get install -y graphviz

RUN mkdir /code
WORKDIR /code

COPY ./parse_nipype.py /code/parse_nipype.py
CMD ["python", "/code/parse_nipype.py"]
