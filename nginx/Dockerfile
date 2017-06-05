FROM nginx:alpine
RUN mkdir -p /oli/webcontent/webcontents
COPY ./default.conf /etc/nginx/conf.d
COPY ./dist/ /usr/share/nginx/html/