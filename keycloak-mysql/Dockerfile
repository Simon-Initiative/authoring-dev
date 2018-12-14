#FROM dalaran.oli.cmu.edu:9993/nexus/repository/docker/jboss/keycloak-mysql:3.1.0.Final
FROM jboss/keycloak:4.3.0.Final

#ENV KEYCLOAK_LOGLEVEL DEBUG

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

USER root
COPY themes/ /opt/jboss/keycloak/themes/
RUN chown -R jboss:jboss /opt/jboss/keycloak/themes/ && mkdir /export && chown -R jboss:0 /export
USER jboss

ADD oli_security-realm.json /export/
ADD oli_security-users-0.json /export/

CMD ["-b", "0.0.0.0", "-Dkeycloak.migration.action=import", \
    "-Dkeycloak.migration.realmName=oli_security", \
    "-Dkeycloak.migration.provider=dir", \
    "-Dkeycloak.migration.dir=/export", \
    "-Dkeycloak.migration.usersExportStrategy=DIFFERENT_FILES", \
    "-Dkeycloak.migration.usersPerFile=1", \
    "-Dkeycloak.migration.strategy=IGNORE_EXISTING"]