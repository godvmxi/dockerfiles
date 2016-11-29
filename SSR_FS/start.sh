#!/bin/bash
nohup /usr/sbin/sshd -D &
python /ssr/shadowsocks/server.py -c /shadowsocks.json
