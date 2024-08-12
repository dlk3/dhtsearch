#!/bin/sh

echo "Waiting for mariadb server to open port 3306"
while ! /usr/bin/nc -z mariadb 3306; do
    sleep 1
done
echo "mariadb port 3306 is now open, performing any new migrations:"

cd /scraper
/usr/local/bin/yarn migrate

echo "Waiting for elasticsearch server to open port 9300"
while ! /usr/bin/nc -z elasticsearch 9300; do
    sleep 1
done
echo "elasticsearch port 9300 is now open, starting to scrape:"

/usr/local/bin/pm2-runtime start ecosystem.config.js
