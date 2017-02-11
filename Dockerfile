FROM ubuntu:16.04

MAINTAINER manyanda.chitimbo@safety-line.fr

ENV REGISTRY_ADDRESS http://178.170.71.124:2250/

COPY dist /root/dist
COPY index.js /root/index.js
COPY entrypoint.sh /root/entrypoint.sh

RUN chmod +x /root/entrypoint.sh
RUN chmod +x /root/index.js

RUN apt-get -y update
RUN apt-get install -y curl
RUN apt-get remove --purge nodejs npm
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get -y update
RUN apt-get -y install nodejs build-essential libfontconfig

WORKDIR /root

EXPOSE 8080

ENTRYPOINT ["/root/entrypoint.sh"]
