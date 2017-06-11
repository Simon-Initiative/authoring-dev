FROM jboss/keycloak-mysql:latest

ENV KEYCLOAK_LOGLEVEL DEBUG

ADD enableProxy.xsl /opt/jboss/keycloak/

RUN java -jar /usr/share/java/saxon.jar \
    -s:/opt/jboss/keycloak/standalone/configuration/standalone.xml \
	-xsl:/opt/jboss/keycloak/enableProxy.xsl \
	-o:/opt/jboss/keycloak/standalone/configuration/standalone.xml;

RUN java -jar /usr/share/java/saxon.jar \
	-s:/opt/jboss/keycloak/standalone/configuration/standalone-ha.xml \
	-xsl:/opt/jboss/keycloak/enableProxy.xsl \
	-o:/opt/jboss/keycloak/standalone/configuration/standalone-ha.xml;

RUN rm /opt/jboss/keycloak/enableProxy.xsl

COPY themes/ /opt/jboss/keycloak/themes/

USER root
RUN mkdir /export && chown -R jboss:0 /export
USER jboss

# -Dkeycloak.migration.strategy=IGNORE_EXISTING
CMD ["-b", "0.0.0.0","-Dkeycloak.migration.action=export", \
    "-Dkeycloak.migration.realmName=oli_security", \
    "-Dkeycloak.migration.provider=dir", \
    "-Dkeycloak.migration.dir=/export", \
    "-Dkeycloak.migration.usersExportStrategy=DIFFERENT_FILES", \
    "-Dkeycloak.migration.usersPerFile=1"]