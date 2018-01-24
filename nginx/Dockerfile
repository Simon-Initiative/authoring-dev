FROM nginx:alpine
RUN mkdir -p /oli/webcontent/webcontents
RUN mkdir -p /oli/course-editor/dist
RUN mkdir /usr/share/nginx/html/content-swagger
COPY ./default.conf /etc/nginx/conf.d
COPY ./swagger/ /usr/share/nginx/html/content-swagger/
