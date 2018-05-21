#FROM fluent/fluentd:v0.12-debian
#RUN ["gem", "install", "fluent-plugin-elasticsearch", "--no-rdoc", "--no-ri", "--version", "1.9.2"]
#COPY fluent.conf /fluentd/etc/fluent.conf

FROM fluent/fluentd:v1.1.3-onbuild

USER root

# below RUN includes plugin as examples elasticsearch is not required
# you may customize including plugins as you wish

RUN apk add --update --virtual .build-deps \
        sudo build-base ruby-dev \
 && sudo -u fluent gem install \
        fluent-plugin-elasticsearch \
        fluent-plugin-record-reformer \
 && sudo -u fluent gem sources --clear-all \
 && apk del .build-deps \
 && rm -rf /var/cache/apk/* \
           /home/fluent/.gem/ruby/2.3.0/cache/*.gem

COPY fluent.conf /fluentd/etc/

USER fluent