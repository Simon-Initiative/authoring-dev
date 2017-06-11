#!/usr/bin/jjs -fv
var cmd = "docker build -t oli/wildfly-mysql ."
$EXEC(cmd);
print($OUT);
if ($ERR) print($ERR);
