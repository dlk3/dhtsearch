FROM fedora:latest

#  Update to latest and install additional softare packages
RUN dnf -y update && dnf -y install httpd mod_ssl php-fpm php-mysqlnd php-pdo php-cli composer p7zip zip unzip procps-ng less && dnf clean all

#  Put my tracker discovery tools in here
COPY ./tools/* /usr/local/bin/

#  Copy in the web site code.
COPY ./html/ /var/www/html/

#  Modify php.ini
#  Write PHP messages to the console
RUN sed -i 's/^;error_log = syslog$/error_log = \/dev\/stderr/' "/etc/php.ini"
#  Output PHP's warning messages on deprecations
#RUN sed -i 's/^error_reporting = .*$/error_reporting = E_ALL \& ~E_STRICT/' "/etc/php.ini"

#  Install the startup script
COPY --chmod=755 ./entrypoint.sh /usr/local/bin/entrypoint.sh
CMD ["/usr/local/bin/entrypoint.sh"]


