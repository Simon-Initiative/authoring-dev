FROM nginx:alpine
RUN mkdir -p /oli/webcontent/webcontents
RUN mkdir /usr/share/nginx/html/content-swagger
COPY ./default.conf /etc/nginx/conf.d
COPY ./content-swagger/ /usr/share/nginx/html/content-swagger/
