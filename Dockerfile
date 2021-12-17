FROM fedora:34

RUN dnf -y upgrade && dnf -y install httpd php composer unzip procps less autossh iputils mysql php-mysqlnd && dnf -y clean all

RUN echo "alias ll='ls -l'" >>/root/.bashrc

COPY ./data/www-php/ /var/www/html/
RUN cd /var/www/html && composer install && chown -R apache:apache *
#RUN chown -R apache:apache /var/www/html
COPY ./data/dhtsearch.conf /etc/httpd/conf.d/dhtsearch.conf

#  The local id_rsa.pub key must be in the authorized_keys file on the remote elasticsearch server
COPY ./data/ssh-keys /root/.ssh
#  This known_hosts file must contain the public key from the remote elasticsearch server
COPY ./data/known_hosts /root/.ssh/known_hosts
RUN chmod 600 /root/.ssh/known_hosts

#  For Google Cloud Run containers only.  Comment out in other environments or php-fpm won't work.
RUN sed -i 's/listen.acl_users/;listen.acl_users/g' /etc/php-fpm.d/www.conf
RUN sed -i 's/listen.allowed_clients/;listen.allowed_clients/g' /etc/php-fpm.d/www.conf

EXPOSE 80

COPY ./data/entrypoint.sh /usr/local/bin/
ENTRYPOINT /usr/local/bin/entrypoint.sh
