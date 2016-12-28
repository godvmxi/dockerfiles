FROM alpine:edge
MAINTAINER Jim Lee <admin@jimlee.cn>

RUN apk update \
    && apk add python libsodium unzip wget \
    && rm -rf /var/cache/apk/*

RUN mkdir /ssr \
    && cd /ssr \
    && wget --no-check-certificate https://github.com/breakwa11/shadowsocks/archive/manyuser.zip -O /tmp/manyuser.zip \
    && unzip -d /tmp /tmp/manyuser.zip \
    && mv /tmp/shadowsocks-manyuser/shadowsocks /ssr/shadowsocks \
    && rm -rf /tmp/*

ADD shadowsocks.json /shadowsocks.json

RUN \
    apk add --no-cache --virtual .build-deps curl \
    && mkdir -p /opt/kcptun \
    && cd /opt/kcptun \
    && curl -fSL https://github.com/xtaci/kcptun/releases/download/v20161111/kcptun-linux-amd64-20161118.tar.gz | tar xz \
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
