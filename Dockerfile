FROM nginx

RUN apt-get update && apt-get install -y git nodejs-legacy npm
RUN npm install -g bower ember-cli

ENV APP_HOME /emberdoro
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
ADD . $APP_HOME

RUN npm install && bower install --allow-root
RUN ember build --environment production

RUN mv /$APP_HOME/dist /app
ADD ./default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /var/lib/apt/lists/*
