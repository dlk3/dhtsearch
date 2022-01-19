# The DHTSearch web site code

The web site's configuration is heavily dependent on the way that the back-end database servers are set up.  What I describe here is based on my personal configuration.  Everyone else's configuration will probably be different.  Figuring out the necessary adjustments is left as an exercise for the user.

Install the code from this repository on your web server:
+ The content of the <code>www-php</code> directory is the web site content.
++ To add the dependent PHP packages, run <code>composer install</code> from the directory where you put this content.
+ The <code>dhtsearch.conf</code> file is an example virtualhost configuration for an Apache web server.

Modify <code>index.php</code>:
+ set host and login credentials for the alphareign database

Establish an SSH tunnel between the web server and the back-end elasticsearch server.
+ Manually set up a SSH login for the web server's root user to some user on the elasticsearch server using SSH keys.
+ The <code>elasticsearch-tunnel.service</code> file, along with the accompanying <code>elasticsearch-tunnel.template</code> configuration file,  is an example of a systemd service script that uses the autossh program to automatically start the tunnel at boot and to keep it alive over time.
