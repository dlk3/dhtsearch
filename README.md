# DHTSearch 

DHTSearch is a scraper that indexes all of the active torrents in the [BitTorrent DHT network](https://www.bittorrent.org/beps/bep_0005.html) that it can find and makes that index available for searching.

Based on the [AlphaReign project](https://github.com/AlphaReign) by [William Prefinem](https://prefinem.com), this project contains the tweaks I have made to AlphaReign, but its real purpose has been to "containerize" the application in Podman/Docker.  I did this to make it easier for me to relocate this application into different hosting environments.

### The Podman/Docker containers

- **scraper:** The Alphareign DHT nodejs code runs here.  There are three nodejs apps: scraper, loader and cleaner.  

   The *scraper* app finds torrents in the DHT cloud and updates a mariadb table with information about them.  

   The *loader* app reads torrents (rows) from the mariadb table, gets the tracker information for each torrent and updates documents for each torrent in elasticsearch. 

   The *cleaner* app is used to keep the databases down to a reasonable size.  It does this by querying the mariadb database for torrents that have not been seen in the DHT cloud for a specified period of time and deleting them from the elasticsearch and mariadb databases.

- **www:** The web site portion of the Alphareign project runs here.  This is a PHP web site that allows people to perform searches on the torrent documents contained in elasticsearch.

- **mariadb:** The mariadb database.

- **elasticsearch:** The elasticsearch database.

### Rootless vs Rootfull

The containers may be run either way but, if you want them to continue to run after you've logged off the server, they need to be run rootfull, i.e., by the root user.  Both Docker and Podman stop rootless containers when the user that started them logs off the system.

### Configuration

#### Database Passwords/Security

I run these containers on a host that only I have access to.  I don't see much point in securing the databases internally.  Their ports aren't exposed on the server outside of the internal Podman/Docker network, let alone to the internet.  Mariadb uses a trivial password that's configured in the `docker-compose.yaml` and `alphareign_docker/conf/index.js` files.  Elasticsearch runs with security turned off.  AlphaReign was written before Elasticsearch supported security in its free versions so code changes would be necessary if Elasticsearch security was to be turned on.

#### scraper Container

The `alphareign_docker/conf/index.js` file configures all three of the of the nodejs apps that run within this container.  This file should not need any changes during Podman/Docker deployment but it is available for runtime tweaking.

PM2 commands can be used to control the apps, i.e., restart them after configuration changes are made:

    podman exec -it scraper pm2 status
    podman exec -it scraper pm2 restart <scraper|loader|cleaner|all>

#### www Container

When you run the container for the first time be sure `define('INVITE_ONLY', false)` is set in `www_docker/html/index.php` so that you can register an ID for yourself.  In this mode anyone can register and use the web site.  If you later want to make the web site available by invitation only, then change this variable to true.  I'd also point out the `define('iREQUEST_LOGIN', true)` setting found here.  This can be set to false to make the web site totally open, i.e., available without requiring registration and login, if that's what you prefer.

The container needs to be configured to set the web site host name properly, in multiple locations.  SSL certificates need to be obtained for the web server and deployed.  I use LetsEncrypt.

- Modify the ServerName entries in `www_docker/conf/virtualhosts.conf`.
- Put the SSL certificates into the `www_docker/certs` directory as `fullchain.pem` and `privkey.pem`.  If that won't work for you, then adjust the `SSLCertificate*` settings in `www_docker/conf/virtualhosts.conf` and the www container's volume mappings in `docker-compose.yaml` to comply with your standards.

   Be sure to take certificate expiration and renewal into account.  I created an automated process on the host system to update my LetsEncrypt certs and restart the httpd server inside the www container when they are renewed, see the stuff that's in `www_docker/letsencrypt` for that.
