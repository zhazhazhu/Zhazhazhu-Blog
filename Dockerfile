FROM nginx:latest

LABEL name="zhazhazhu-blog"

LABEL version="0.0.1"

#工作目录
WORKDIR /

COPY ./dist /usr/share/nginx/html

COPY ./zhazhazhu.conf /etc/nginx/conf.d

EXPOSE 80
