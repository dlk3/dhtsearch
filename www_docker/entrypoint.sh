#!/bin/sh

#  Install vendor packages, if necessary
cd /var/www/html
composer install

#  Start PHP daemon
mkdir --mode=755 /run/php-fpm
/usr/sbin/php-fpm

#  Start web server
httpd -D FOREGROUND
