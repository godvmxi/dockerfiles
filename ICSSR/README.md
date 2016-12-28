# I See SSR
A docker project for collecting and presenting all info about ssr deployed on arukas.io

## Usage
```
image  jimlee1996/icssr
port   3999 TCP
CMD    node /app/server.js yourtoken yoursecret xxxxx-appid-xxxxxx
# suggest

CMD : node /app/server.js xxxx@gmail.com yourpassword xxxxx-appid-xxxxxx
# for losers
```

详细说明一下CMD中的命令。

token 和 secret 获取地址：

https://app.arukas.io/settings/api-keys


xxxx@gmail.com  是arukas注册邮箱。

password 是arukas登录密码。

xxxxx-appid-xxxxxx 是你要获取IP和端口的APPID （也可以不传，默认是 all）

你建立的APP都有一个ID。例如：
ID	fd9b708e-9a2c-45a0-b81c-620944369c2d

该ID必须在你的账号下才能访问。
如果你输入的appid 是 all。会自动获取你账号下使用以下镜像创建的APP。

"jimlee1996/ssr"
