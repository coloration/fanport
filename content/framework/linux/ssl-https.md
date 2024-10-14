---
title: HTTPS SSL证书配置 letsencrypt
index: Framework.Linux.Command
---

<https://certbot.eff.org/instructions> 前往网站选择系统根据提示进行操作

1. 生成证书，并自动更新

e.g. nginx + debian

``` bash
$ apt-get install snapd  # certbot 前置
$ apt-get remove certbot # 删除之前的版本
$ snap install --classic certbot # 安装 vertbot
$ ln -s /snap/bin/certbot /usr/bin/certbot # 添加软连接
$ certbot certonly --nginx #手动配置

# Saving debug log to /var/log/letsencrypt/letsencrypt.log
# Enter email address (used for urgent renewal and security notices)
(Enter 'c' to cancel): yours@domain.com

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# Please read the Terms of Service at
# https://letsencrypt.org/documents/LE-SA-v1.3-September-21-2022.pdf. You must
# agree in order to register with the ACME server. Do you agree?
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: Y

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# Would you be willing, once your first certificate is successfully issued, to
# share your email address with the Electronic Frontier Foundation, a founding
# partner of the Let's Encrypt project and the non-profit organization that
# develops Certbot? We'd like to send you email about our work encrypting the web,
# EFF news, campaigns, and ways to support digital freedom.
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: Y
# Account registered.
# Which names would you like to activate HTTPS for?
# We recommend selecting either all domains, or all domains in a VirtualHost/server block.
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# 1: admin.your-domain.com
# 2: www.your-domain.com
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# Select the appropriate numbers separated by commas and/or spaces, or leave input
blank to select all options shown (Enter 'c' to cancel): #### 这里没填选择全部
# Requesting a certificate for admin.your-domain.com and www.your-domain.com

# Successfully received certificate.
# Certificate is saved at: /etc/letsencrypt/live/admin.your-domain.com/fullchain.pem
# Key is saved at:         /etc/letsencrypt/live/admin.your-domain.com/privkey.pem
# This certificate expires on 2024-04-08.
# These files will be updated when the certificate renews.
# Certbot has set up a scheduled task to automatically renew this certificate in the background.
### 这里提示在后台添加了自动更新认真
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# If you like Certbot, please consider supporting our work by:
#  * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
#  * Donating to EFF:                    https://eff.org/donate-le
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

2. 配置好后修改nginx 配置文件

e.g. `/etc/nginx/conf.d/default.conf`


``` bash
server {
  listen 443 ssl;
  server_name www.your-domain.com; # 刚才认证的域名1
  ssl_certificate /etc/letsencrypt/live/admin.your-domain.com/fullchain.pem; # 填好证书路径
  ssl_certificate_key /etc/letsencrypt/live/admin.your-domain.com/privkey.pem;  # 填好证书路径
  ssl_session_timeout 5m;

  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
  ssl_prefer_server_ciphers on;

  location / {
    root /home/your-website/app/dist; # 静态文件地址
    index index.html;
  }

}
server {
  listen 443 ssl;
  server_name admin.your-domain.com; # 刚才认证的域名2
  ssl_certificate /etc/letsencrypt/live/admin.your-domain.com/fullchain.pem; # 填好证书路径 两个域名用同一个证书
  ssl_certificate_key /etc/letsencrypt/live/admin.your-domain.com/privkey.pem; # 填好证书路径
  ssl_session_timeout 5m;

  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
  ssl_prefer_server_ciphers on;
  location / { 
    proxy_pass http://localhost:3000; # 反向代理
  }
}

# http 重定向到 https
server {
  listen 80;
  server_name www.your-domain.com;

  return 301 https://$host$request_uri;
}

# http 重定向到 https

server {
  listen 80;
  server_name admin.your-domain.com;
  
  return 301 https://$host$request_uri;
}
```

3. 重启nginx

``` bash
$ systemctl reload nginx
```