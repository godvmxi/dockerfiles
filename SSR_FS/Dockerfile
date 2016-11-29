FROM ubuntu:14.04.5
MAINTAINER Jim Lee <admin@jimlee.cn>

RUN apt-get update && \
    apt-get install -y wget python python-pip python-m2crypto libnet1-dev libpcap0.8-dev git gcc openssh-server iptables openjdk-7-jre libpcap-dev && \
    apt-get clean all

#ssh
RUN mkdir /var/run/sshd
RUN echo 'root:root' |chpasswd
RUN sed -ri 's/^PermitRootLogin\s+.*/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -ri 's/UsePAM yes/#UsePAM yes/g' /etc/ssh/sshd_config
EXPOSE 22

#install libsodium support chacha20
RUN wget --no-check-certificate -O libsodium-1.0.11.tar.gz https://github.com/jedisct1/libsodium/releases/download/1.0.11/libsodium-1.0.11.tar.gz \
    && tar zxf libsodium-1.0.11.tar.gz && rm -rf libsodium-1.0.11.tar.gz
WORKDIR libsodium-1.0.11
RUN ./configure && make && make install
RUN echo "/usr/local/lib" > /etc/ld.so.conf.d/local.conf
RUN ldconfig && cd .. && rm -rf libsodium-1.0.11

RUN git clone -b manyuser https://github.com/breakwa11/shadowsocks.git /ssr
	
ADD shadowsocks.json /shadowsocks.json

RUN mkdir -p /fs/ \
	&& wget --no-check-certificate https://raw.githubusercontent.com/91yun/finalspeed/master/fs1.2_server/fs.jar -O /fs/fs.jar \
	&& wget --no-check-certificate https://raw.githubusercontent.com/91yun/finalspeed/master/finalspeed-debian -O /etc/init.d/finalspeed \
	&& chmod +x /etc/init.d/finalspeed \
	&& update-rc.d -f finalspeed defaults \
	&& /etc/init.d/finalspeed start
	
ADD start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 22
EXPOSE 8388/tcp

ENTRYPOINT ["/start.sh"]
