#!/bin/bash

$JBOSS_HOME/wait-for-it.sh $serverurl:8080 -- echo "keycloak started"

$JBOSS_HOME/bin/add-user.sh -up mgmt-users.properties $adminuser $adminpass --silent

echo "=> Stating WildFly"
# -Dcom.sun.management.jmxremote.rmi.port=9090 -Dcom.sun.management.jmxremote=true -Dcom.sun.management.jmxremote.port=9090 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.local.only=false -Djava.rmi.server.hostname=128.237.202.186

$JBOSS_HOME/bin/standalone.sh -b 0.0.0.0 -bmanagement 0.0.0.0 --debug
