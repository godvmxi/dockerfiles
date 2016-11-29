FROM debian:latest
MAINTAINER Jim Lee <admin@jimlee.cn>

RUN apt-get update \
	&& apt-get install -y unzip wget python python-m2crypto libnet1-dev libpcap0.8-dev gcc \
	&& apt-get -y install iptables \
	&& apt-get install -y openjdk-7-jre \
	&& rm -rf /var/lib/apt/lists/* \
	&& apt-get clean

#install libsodium support chacha20
RUN wget --no-check-certificate -O libsodium-1.0.11.tar.gz https://github.com/jedisct1/libsodium/releases/download/1.0.11/libsodium-1.0.11.tar.gz &&\
    tar zxf libsodium-1.0.11.tar.gz && rm -rf libsodium-1.0.11.tar.gz
WORKDIR libsodium-1.0.11
RUN ./configure && make && make install
RUN echo "/usr/local/lib" > /etc/ld.so.conf.d/local.conf
RUN ldconfig && cd .. && rm -rf libsodium-1.0.11

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
