FROM node:16.13.1-alpine

EXPOSE 6881/udp

ADD . /scraper
WORKDIR /scraper

RUN yarn && yarn global add pm2

CMD ["/bin/sh", "-c", "/scraper/entrypoint.sh"]
