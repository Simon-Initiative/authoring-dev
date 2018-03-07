FROM centos:centos7

RUN yum -y update; yum clean all
RUN yum -y install openssh-server passwd; yum clean all

ADD ./dumb-init /usr/local/bin/
RUN chmod +x /usr/local/bin/dumb-init

ADD ./start.sh /start.sh
RUN mkdir /var/run/sshd

RUN ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key -N ''

RUN chmod +x /start.sh
EXPOSE 22

ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]
CMD ["bash", "-c", "/start.sh && exec /usr/sbin/sshd -D"]