FROM codercom/code-server:v2

USER root

RUN apt-get update -y

# install docker
RUN apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
RUN apt-get update -y
RUN apt-get install -y docker-ce docker-ce-cli containerd.io
RUN sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose

# install node and dev dependencies
RUN apt-get install -y nodejs npm
RUN npm install -g n yarn typescript ts-node
RUN apt-get install -y default-jdk

ENTRYPOINT ["dumb-init", "code-server", "--allow-http", "--disable-telemetry", "--auth", "password"]
