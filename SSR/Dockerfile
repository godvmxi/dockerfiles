FROM alpine:edge
MAINTAINER Jim Lee <admin@jimlee.cn>

RUN apk update \
    && apk add python libsodium unzip \
    && rm -rf /var/cache/apk/*

COPY shadowsocksr-manyuser.zip /tmp/manyuser.zip

RUN mkdir /ssr \
    && cd /ssr \
    && unzip -d /tmp /tmp/manyuser.zip \
    && mv /tmp/shadowsocksr-manyuser/shadowsocks /ssr/shadowsocks \
    && rm -rf /tmp/*

ADD shadowsocks.json /shadowsocks.json

RUN mkdir -p /opt/kcptun
COPY kcptun-linux-amd64.tar.gz /opt/kcptun/kcptun.tar.gz

RUN cd /opt/kcptun \
    && tar xz kcptun.tar.gz \
    && rm client_linux_amd64 \
    && cd ~ \
    && apk del .build-deps \
    && apk add --no-cache supervisor
	
ADD kcptun.json /kcptun.json

COPY supervisord.conf /etc/supervisord.conf

ADD start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8388/tcp 18388/udp
ENTRYPOINT ["/start.sh"]
