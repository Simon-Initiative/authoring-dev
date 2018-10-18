FROM nginx
RUN mkdir -p /oli/webcontent/webcontents
RUN mkdir -p /oli/repository
RUN mkdir -p /oli/superactivity
RUN mkdir -p /oli/branding
RUN mkdir /usr/share/nginx/html/content-swagger
COPY ./swagger/ /usr/share/nginx/html/content-swagger/
COPY ./default.conf /etc/nginx/conf.d