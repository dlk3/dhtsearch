FROM fedora:latest

EXPOSE 80
EXPOSE 443

#  Update to latest and install additional softare packages
RUN dnf -y update && dnf -y install httpd mod_ssl php-fpm php-mysqlnd php-pdo php-cli composer p7zip zip unzip procps-ng less mariadb && dnf clean all

#  Set the timezone so that container's logs use same timezone as the host
RUN ln -sf /usr/share/zoneinfo/EST5EDT /etc/localtime

#  Create a client profile to make it easier to run the mysql client on this machine for debugging purposes
COPY --chown=0:0 --chmod=640 ./my.cnf /root/.my.cnf

#  Put my tracker discovery tools in here
COPY --chmod=755 ./tools/* /usr/local/bin/

#  Copy in the web site code.
COPY ./html/ /var/www/html/

#  Modify php.ini
#  Write PHP messages to the console
#RUN sed -i 's/^;error_log = syslog$/error_log = \/dev\/stderr/' "/etc/php.ini"
#  Change logging options to include PHP's warning messages on deprecations
#RUN sed -i 's/^error_reporting = .*$/error_reporting = E_ALL \& ~E_STRICT/' "/etc/php.ini"

VOLUME ["/etc/letsencrypt/", "/etc/httpd/conf.d/virtualhost.conf", "/etc/httpd/conf.d/ssl.conf"]
VOLUME ["/var/log/httpd/", "/var/log/php-fpm/"]

#  Install the startup script
COPY --chmod=755 ./entrypoint.sh /usr/local/bin/entrypoint.sh
CMD ["/usr/local/bin/entrypoint.sh"]


