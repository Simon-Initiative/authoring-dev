FROM jboss/wildfly:14.0.1.Final
MAINTAINER Raphael Gachuhi, oli.cmu.edu

ENV DEPLOYMENT_DIR ${JBOSS_HOME}/standalone/deployments/

RUN cd $JBOSS_HOME \
    && curl -O https://downloads.jboss.org/keycloak/4.3.0.Final/adapters/keycloak-oidc/keycloak-wildfly-adapter-dist-4.3.0.Final.tar.gz \
    && tar xf keycloak-wildfly-adapter-dist-4.3.0.Final.tar.gz \
    && rm keycloak-wildfly-adapter-dist-4.3.0.Final.tar.gz \
    && ${JBOSS_HOME}/bin/jboss-cli.sh --file=${JBOSS_HOME}/bin/adapter-install-offline.cli \
    && cd $HOME

RUN mkdir -p ${JBOSS_HOME}/modules/system/layers/base/com/mysql/jdbc/main; cd ${JBOSS_HOME}/modules/system/layers/base/com/mysql/jdbc/main && curl -O http://central.maven.org/maven2/mysql/mysql-connector-java/5.1.40/mysql-connector-java-5.1.40.jar
ADD module.xml ${JBOSS_HOME}/modules/system/layers/base/com/mysql/jdbc/main/

USER root
RUN yum -y upgrade

ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
