FROM debian:latest
MAINTAINER Jim Lee <admin@jimlee.cn>

RUN apt-get update \
	&& apt-get install -y python libsodium unzip wget libpcap-dev iptables openjdk-7-jre \
	&& rm -rf /var/lib/apt/lists/* \
	&& apt-get clean
	
RUN mkdir /ssr \
    && cd /ssr \
    && wget --no-check-certificate https://github.com/breakwa11/shadowsocks/archive/manyuser.zip -O /tmp/manyuser.zip \
    && unzip -d /tmp /tmp/manyuser.zip \
    && mv /tmp/shadowsocks-manyuser/shadowsocks /ssr/shadowsocks \
    && rm -rf /tmp/*
	
ADD shadowsocks.json /shadowsocks.json

RUN mkdir -p /fs/ \
	&& wget --no-check-certificate https://raw.githubusercontent.com/91yun/finalspeed/master/fs1.2_server/fs.jar -O /fs/fs.jar \
	&& wget --no-check-certificate https://raw.githubusercontent.com/91yun/finalspeed/master/finalspeed-debian -O /etc/init.d/finalspeed \
	&& chmod +x /etc/init.d/finalspeed \
	&& update-rc.d -f finalspeed defaults
	
ADD start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8388/tcp
ENTRYPOINT ["/start.sh"]
