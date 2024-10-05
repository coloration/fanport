### 查看端口占用 

``` bash
$ netstat -ano| findstr 8080
```


### 无端口占用，无法启动端口

``` bash
$ net stop winnat
$ net start winnat
``` 


### 管理开机启动项 

> `win` + `R`, `services.msc`
