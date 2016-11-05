FROM alpine:latest
MAINTAINER JimLee <admin@jimlee.cn>

RUN set -ex \
    && apk add --no-cache openssh
	
RUN echo 'root:root' |chpasswd

RUN sed -ri 's/^PermitRootLogin\s+.*/PermitRootLogin yes/' /etc/ssh/sshd_config && \
	sed -ri 's/UsePAM yes/#UsePAM yes/g' /etc/ssh/sshd_config
	
RUN mkdir -p /var/run/sshd

EXPOSE 22

CMD    ["/usr/sbin/sshd", "-D"]
