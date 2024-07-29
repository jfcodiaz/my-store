# Usa la imagen base de Node.js 20
FROM node:20

# Instala wget, unzip, y curl
RUN apt-get update && apt-get install -y wget unzip curl

# Descarga e instala Java 17
RUN wget -O /tmp/openjdk-17_linux-x64_bin.tar.gz https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.5+8/OpenJDK17U-jdk_x64_linux_hotspot_17.0.5_8.tar.gz \
    && mkdir -p /opt/java/openjdk \
    && tar -xzf /tmp/openjdk-17_linux-x64_bin.tar.gz -C /opt/java/openjdk --strip-components=1 \
    && rm /tmp/openjdk-17_linux-x64_bin.tar.gz

ENV JAVA_HOME=/opt/java/openjdk
ENV PATH=$JAVA_HOME/bin:$PATH

# Verifica que Java esté instalado correctamente
RUN java -version

# Descarga e instala SonarScanner
RUN wget -O /tmp/sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-6.1.0.4477-linux-x64.zip \
    && unzip /tmp/sonar-scanner.zip -d /opt \
    && rm /tmp/sonar-scanner.zip \
    && mv /opt/sonar-scanner-* /opt/sonar-scanner \
    && ln -s /opt/sonar-scanner/bin/sonar-scanner /usr/local/bin/sonar-scanner \
    && chmod +x /opt/sonar-scanner/bin/sonar-scanner

# Comando por defecto para ejecutar tu aplicación
# CMD ["npm", "start"]

CMD ["tail", "-f /dev/null"]