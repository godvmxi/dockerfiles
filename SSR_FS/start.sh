#!/bin/sh

/etc/init.d/finalspeed start
/usr/bin/python /ssr/shadowsocks/server.py -c /shadowsocks.json > /dev/null

