FROM alpine:edge
MAINTAINER Jim Lee <admin@jimlee.cn>

RUN apk update \
    && apk add python libsodium unzip \
    && rm -rf /var/cache/apk/*

COPY shadowsocks.zip /tmp/shadowsocks.zip
COPY kcptun.zip /tmp/kcptun.zip

RUN mkdir /shadowsocks \
    && unzip -d /shadowsocks /tmp/shadowsocks.zip
RUN mkdir /kcptun \
    && unzip -d /kcptun /tmp/kcptun.zip \
    && chmod +x /kcptun/server_linux_amd64

RUN rm -rf /tmp/*

ADD shadowsocks.json /shadowsocks.json
ADD kcptun.json /kcptun.json

RUN apk add --no-cache supervisor

COPY supervisord.conf /etc/supervisord.conf

ADD start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8388/tcp 18388/udp
ENTRYPOINT ["/start.sh"]
