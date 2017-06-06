FROM haproxy:1.7
COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
RUN mkdir /certs
ADD combined.pem /certs/