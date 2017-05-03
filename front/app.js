/*
 * JBoss, Home of Professional Open Source
 * Copyright 2016, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var keycloak = new Keycloak();
var serviceUrl = 'http://10.0.0.9'

function notAuthenticated() {
    document.getElementById('not-authenticated').style.display = 'block';
    document.getElementById('authenticated').style.display = 'none';
}

function authenticated() {
    document.getElementById('not-authenticated').style.display = 'none';
    document.getElementById('authenticated').style.display = 'block';
    document.getElementById('message').innerHTML = 'User: ' + keycloak.tokenParsed['preferred_username'];
}

function request(method, endpoint) {
    var req = function () {
        var req = new XMLHttpRequest();
        var output = document.getElementById('message');
        //req.open(method, serviceUrl + '/' + endpoint, true);

        req.open(method, serviceUrl + '/' + endpoint, true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        if (keycloak.authenticated) {
            console.log('Keycloak token ' + keycloak.token);
            req.setRequestHeader('Authorization', 'Bearer ' + keycloak.token);
        }
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    output.innerHTML = 'Message: ' + req.responseText;
                } else if (req.status == 0) {
                    output.innerHTML = '<span class="error">Request failed</span>';
                } else {
                    output.innerHTML = '<span class="error">' + req.status + ' ' + req.statusText + '</span>';
                }
            }
        };
        if (method === "POST") {
            var payload = '{"@id": "package_'+guid()+'", "@version": "1.0", "title": "Testing Testing", "description": "Empty project template for authoring OLI content packages."}';
            req.send(payload);
        } else {
            req.send();
        }
    };

    if (keycloak.authenticated) {
        keycloak.updateToken(30).success(req);
    } else {
        req();
    }
}

function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }

    return _p8() + _p8(true) + _p8(true) + _p8();
}

window.onload = function () {
    keycloak.init({onLoad: 'check-sso', checkLoginIframeInterval: 1}).success(function () {
        if (keycloak.authenticated) {
            authenticated();
        } else {
            notAuthenticated();
        }

        document.body.style.display = 'block';
    });
}

keycloak.onAuthLogout = notAuthenticated;
