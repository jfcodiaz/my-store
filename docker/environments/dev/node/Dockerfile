FROM node:20 AS base

RUN apt-get update \
    && apt-get --no-install-recommends install -y \
    curl \
    sudo \
    unzip \
    && apt-get clean \
    && groupadd -f node && useradd -m -g node user \
    && echo "user ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

    USER user

    CMD ["tail", "-f", "/dev/null"]

FROM base AS dev

ENV JAVA_HOME=/opt/java/openjdk
ENV PATH=$JAVA_HOME/bin:$PATH

ADD https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.5+8/OpenJDK17U-jdk_x64_linux_hotspot_17.0.5_8.tar.gz /tmp/openjdk-17_linux-x64_bin.tar.gz 
RUN sudo mkdir -p /opt/java/openjdk \
    && sudo tar -xzf /tmp/openjdk-17_linux-x64_bin.tar.gz -C /opt/java/openjdk --strip-components=1 \
    && rm /tmp/openjdk-17_linux-x64_bin.tar.gz

ADD https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-6.1.0.4477-linux-x64.zip /tmp/sonar-scanner.zip
RUN sudo unzip /tmp/sonar-scanner.zip -d /opt \
    && sudo rm /tmp/sonar-scanner.zip \
    && sudo mv /opt/sonar-scanner-* /opt/sonar-scanner \
    && sudo ln -s /opt/sonar-scanner/bin/sonar-scanner /usr/local/bin/sonar-scanner \
    && sudo chmod +x /opt/sonar-scanner/bin/sonar-scanner

FROM base AS production

USER user

RUN sudo apt-get --no-install-recommends install -y \
    postgresql \
    postgresql-contrib \
    && sudo apt-get clean \
    && sudo rm -rf /var/lib/apt/lists/* \
    && sudo sed -i "s/peer/trust/g"  /etc/postgresql/*/main/pg_hba.conf \
    && sudo sed -i "s/md5/trust/g"  /etc/postgresql/*/main/pg_hba.conf

COPY docker/environments/dev/node/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN sudo chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 5432

COPY ./code /app
WORKDIR /app

RUN sudo npm install --ignore-scripts

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
