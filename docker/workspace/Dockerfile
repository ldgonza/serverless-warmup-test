FROM debian:stretch

LABEL maintainer="Tehuel Torres Baldi <torresbaldi.tehuel@gmail.com>"

# Adds work directory
RUN mkdir /var/www
WORKDIR /var/www

# install basic packages
RUN apt-get update && apt-get install -y -q --no-install-recommends \
    apt-transport-https \
    lsb-release \
    ca-certificates \
    gnupg \
    curl

# Add node 10 packages source
RUN curl -sSL https://deb.nodesource.com/setup_10.x | bash -

# Add yarn packages source
RUN curl -sSL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# install everything
RUN apt-get update && apt-get install -y -q --no-install-recommends \
    # pkg-config \
    libcurl4-openssl-dev \
    libedit-dev \
    libssl-dev \
    libxml2-dev \
    xz-utils \
    # libsqlite3-dev \
    # sqlite3 \
    git \
    curl \
    vim \
    nano \
    # postgresql-client \
    python-pip \
    python-setuptools \
    gcc \
    g++ \
    make \
    nodejs \
    yarn \
    && apt-get clean

# Adds/configures www-data user
ARG PUID=1000
ARG PGID=1000
RUN usermod -u ${PUID} www-data && groupmod -g ${PGID} www-data
RUN mkdir /home/www-data && chown -R www-data:www-data /home/www-data && usermod -d /home/www-data www-data
USER www-data

# install wheel
RUN pip install wheel

# install awscli
RUN pip install awscli

# fix npm version
# RUN npm install npm@6.10.2 -g

# install some global npm packages
RUN mkdir /home/www-data/.npm-global && npm config set prefix '~/.npm-global'

# Add npm and .local (for aws cli) binaries to www-data user's path
RUN echo "PATH=~/.npm-global/bin:~/.local/bin:$PATH" >> /home/www-data/.bashrc

RUN npm install -g serverless

RUN pip install awslogs