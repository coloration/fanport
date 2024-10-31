---
title: 命令行
---


## SCP

一个命令行实用程序，用于通过 SSH 连接在两台计算机之间安全地复制文件。它是一种可靠且高效的文件传输方式，尤其是在处理敏感数据时


``` bash
scp [options] source_file destination_host:destination_path
```

::accordion{title=Options}

- `-p`: 保留修改时间、访问时间和权限。   
- `-r`: 递归复制目录及其内容。   
- `-P port_number`: 指定用于 SSH 连接的端口号。 
- `-i identity_file`: 指定用于身份验证的身份文件（私钥）。 
::


::accordion{title=Examples}


``` bash
# 上传单个文件
scp my_file.txt user@192.168.1.100:/path/to/remote/directory

# 
scp my_file1.txt my_file2.txt user@192.168.1.100:/path/to/remote/directory

# 上传整个目录

scp -r ./ user@192.168.1.100:/home/abc

```

::


## CURL

一个功能强大的命令行工具，用于传输数据。它支持多种协议，包括 HTTP、HTTPS、FTP、FTPS等，常用于下载文件、上传数据、测试服务器等。

``` bash
curl [options] [URL]
```

::accordion{title=Options}

- `-o, --output`: 将输出保存到指定文件。   
- `-O, --remote-name`: 使用远程文件的名字保存。   
- `-L, --location`: 跟随重定向。 
- `-s, --silent`: 静默模式，不输出进度信息。 
- `-v, --verbose`:显示详细的调试信息。
- `-u, --user<用户名:密码>`:进行基本认证。
- `-X, --request <方法>`:指定请求方法（GET、POST、PUT 等）。
- `-H, --header <头信息>`: 添加自定义请求头。

::



::accordion{title=Examples}


``` bash
# 下载文件
$ curl -O https://download.example.com/package.tar.gz

# 上传文件
$ curl -X POST -F "file=@local_file.txt" http://example.com/upload

# POST 请求
$ curl -X POST -d "name=John&age=30" http://example.com/submit

# 测试服务器
$ curl -v https://api.example.com

# JSON 数据
$ curl -s https://api.example.com/data | jq .

# Cookie
$ curl -c cookie.txt -b cookie.txt https://example.com

# 代理
curl --proxy socks5://127.0.0.1:1080 https://example.com

# 下载一个网页并保存为 HTML 文件
$ curl -o my-page.html https://www.baidu.com

# 上传一个文件到服务器
$ curl -F "file=@my-image.jpg" http://example.com/upload

# 发送一个 POST 请求，包含 JSON 数据
$ curl -X POST -H "Content-Type: application/json" -d '{"name": "Alice", "age": 25}' https://api.example.com/users

# 获取一个 API 的返回结果并解析 JSON
$ curl https://api.github.com/users/octocat | jq .name
```

::
