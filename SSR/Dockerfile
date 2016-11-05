#
# Dockerfile for ShadowsocksR
#

FROM ubuntu:16.04
MAINTAINER Jim Lee "admin@jimlee.cn"

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
        supervisor \
        git \
    && rm -rf /var/lib/apt/lists/* \
    && cd /opt \
    && git clone -b manyuser https://github.com/breakwa11/shadowsocks.git 

COPY init.sh /init.sh
COPY user-config.json /opt/shadowsocks/
COPY supervisord.conf /etc/supervisor/
COPY ssr.conf /etc/supervisor/conf.d/
COPY kcptun /opt/
COPY kcptun.json /opt/
COPY kcp.conf /etc/supervisor/conf.d/

ENTRYPOINT ["/init.sh", "/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf"]
