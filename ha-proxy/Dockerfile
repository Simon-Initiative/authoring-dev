FROM haproxy:1.7
COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
# For production
#COPY haproxy-prod.cfg /usr/local/etc/haproxy/haproxy.cfg
RUN mkdir /certs
COPY combined.pem /certs/combined.pem