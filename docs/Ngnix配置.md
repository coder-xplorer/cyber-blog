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

开发时访问是正常的，但当打包部署后，会发现当访问 test.com/about 是正常的，但是刷新 test.com/about，就报 404 了。

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

### 路径代理

**Nginx 路径代理主要通过 location 块配合 proxy_pass 指令实现**

```
server {
    listen 80;
    server_name example.com;  # 你的域名

    # 路径代理配置
    location /api/ {  # 匹配以 /api/ 开头的路径
        proxy_pass http://backend-server:3000/;  # 转发到目标服务器

        # CORS配置 - 允许所有域名
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization' always;

        # 必须处理OPTIONS预检
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization' always;
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;  # 直接返回204，不转发到后端
        }

        # 传递原始请求的Host头（域名）给后端
        # 后端可以通过这个知道客户端访问的是哪个域名
        proxy_set_header Host $host;

        # 传递客户端的真实IP地址给后端
        # 如果不设置，后端看到的IP会是nginx服务器的IP，而设置了这个头，后端就可以通过这个头知道客户端的真实IP
        proxy_set_header X-Real-IP $remote_addr;

        # 传递客户端IP的完整代理链
        # 格式：客户端IP, 代理1 IP, 代理2 IP...
        # 用于追踪请求经过的所有代理服务器
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # 传递原始请求的协议（http或https）给后端
        # 后端可以通过这个知道客户端用的是http还是https访问
        # 常用于生成正确的重定向URL
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
