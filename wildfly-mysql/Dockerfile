FROM jboss/wildfly:latest
MAINTAINER Raphael Gachuhi, oli.cmu.edu

ENV DEPLOYMENT_DIR ${JBOSS_HOME}/standalone/deployments/

ADD changeDatabase.xsl ${JBOSS_HOME}/
RUN java -jar /usr/share/java/saxon.jar -s:${JBOSS_HOME}/standalone/configuration/standalone.xml -xsl:${JBOSS_HOME}/changeDatabase.xsl -o:${JBOSS_HOME}/standalone/configuration/standalone.xml; java -jar /usr/share/java/saxon.jar -s:${JBOSS_HOME}/standalone/configuration/standalone-ha.xml -xsl:${JBOSS_HOME}/changeDatabase.xsl -o:${JBOSS_HOME}/standalone/configuration/standalone-ha.xml; rm ${JBOSS_HOME}/changeDatabase.xsl

RUN mkdir -p ${JBOSS_HOME}/modules/system/layers/base/com/mysql/jdbc/main; cd ${JBOSS_HOME}/modules/system/layers/base/com/mysql/jdbc/main && curl -O http://central.maven.org/maven2/mysql/mysql-connector-java/5.1.40/mysql-connector-java-5.1.40.jar
ADD module.xml ${JBOSS_HOME}/modules/system/layers/base/com/mysql/jdbc/main/

RUN cd $JBOSS_HOME \
    && curl -O https://downloads.jboss.org/keycloak/3.0.0.Final/adapters/keycloak-oidc/keycloak-wildfly-adapter-dist-3.0.0.Final.tar.gz \
    && tar xf keycloak-wildfly-adapter-dist-3.0.0.Final.tar.gz \
    && rm keycloak-wildfly-adapter-dist-3.0.0.Final.tar.gz \
    && ${JBOSS_HOME}/bin/jboss-cli.sh --file=${JBOSS_HOME}/bin/adapter-install-offline.cli \
    && cd $HOME

USER root
RUN yum -y upgrade

ADD execute.sh ${JBOSS_HOME}/
ADD wait-for-it.sh ${JBOSS_HOME}/
RUN chmod +x ${JBOSS_HOME}/execute.sh && chmod +x ${JBOSS_HOME}/wait-for-it.sh

RUN mkdir -p /oli/course_content_xml \
    && mkdir /oli/course_content_volume \
    && mkdir /oli/course_content_out \
    && mkdir /oli/webcontent \
    && mkdir /oli/service_config \
    && chown -R jboss:0 /oli \
    && chmod a+rwx -R /oli/course_content_xml \
    && chmod a+rwx -R /oli/course_content_volume \
    && chmod a+rwx -R /oli/course_content_out \
    && chmod a+rwx -R /oli/webcontent

ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
USER jboss

ENTRYPOINT ${JBOSS_HOME}/execute.sh
