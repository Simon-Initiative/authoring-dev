FROM dalaran.oli.cmu.edu:9993/nexus/repository/docker/oli/keycloak-mysql
ADD oli_security-realm.json /export/
ADD oli_security-users-0.json /export/
# Import Keycloak DB
CMD ["-b", "0.0.0.0","-Dkeycloak.migration.action=import", \
    "-Dkeycloak.migration.strategy=IGNORE_EXISTING", \
    "-Dkeycloak.migration.provider=dir", \
    "-Dkeycloak.migration.dir=/export"]