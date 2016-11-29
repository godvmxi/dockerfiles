#!/bin/sh

nohup /usr/sbin/sshd -D &
nohup /usr/bin/python /ssr/shadowsocks/server.py -c /shadowsocks.json > /dev/null &
/etc/init.d/finalspeed start
