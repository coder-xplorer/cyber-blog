# Ngnix 配置

### 配置 Ngnix
```js
server {
 listen 80;
 server_name yourdomain.com;
    // 根路径配置
    location / {
        root   /usr/share/html;
        index  index.html index.htm;
    }
    // 配置多路径
    location /other {
        alias   /usr/share/other;  // 文件路径
        index index.html index.html;
    }

    # 其他配置...

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}
```

### 路由为 history 模式配置

要开启 History 模式，vue router 的配置很简单，只要加上下面一句话：`mode: 'history'`，然后重新打包，上传到服务器，重启 Nginx 即可。

开发时访问是正常的，但当打包部署后，会发现当访问 test.com/about 是正常的，但是刷新 test.com/about，就报404了。


** try_files **

为什么会出现这种情况呢？因为刷新时通过 nginx 去访问静态资源的，明显这个路径是找不到，因为这个只是前端路由。为了解决这个问题，我们需要当访问的是前端路由时，去访问 index.html 这个主入口，再由前端路由自己来访问到对应的页面。而 nginx 就会用到 try_files 这个指令。

```js
 // 根路径配置
location / {
    root   /usr/share/html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
}

 // 配置多路径
location /test {
  alias /web/ui;
  index index.html;
  try_files $uri $uri/ /test/index.html;  // 多路径需要加上路径名
}
```

