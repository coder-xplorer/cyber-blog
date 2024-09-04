# Ngnix 配置

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
        alias   /usr/share/other;
        index index.html index.html;
    }

    # 其他配置...

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}
```
