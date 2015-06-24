FROM nginx

RUN apt-get update && apt-get install -y git nodejs-legacy npm
RUN npm install -g bower ember-cli

RUN mkdir /emberdoro
ADD ./* /emberdoro/
WORKDIR /emberdoro
RUN npm install && bower install --allow-root
RUN ember build --environment production

WORKDIR /
RUN mv /emberdoro/dist /app

ADD ./default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /var/lib/apt/lists/*
