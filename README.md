# The DHTSearch web server in a container

This configuration is specific to my installation of the Alphareign components.  It will likely require some amount of reconfiguration in order to work in someone else's environment.

Modify data/www-php/index.js:
+ set host and login credentials for the alphareign database

Modify data/entrypoint.sh:
+ set host ip for elasticsearch server

Ensure that the SSH keys are set up properly:
+ use <code>ssh-keygen</code> to create a set of key files and put them into the <code>data/ssh-keys</code> directory.
+ put the public key from <code>data/ssh-keys/id-rsa.pub</code> into the <code>known_hosts</code> file on the elasticsearch server.
+ get the host key for the elasticsearch server from your workstation's <code>known_hosts</code> file and put it into <code>data/known_hosts</code>.

See the comments surrounding the php-fpm ACL settings in the Dockerfile.  These steps are only needed when you are building a container that will run in Google's Cloud Run environment.  They will break php-fpm in other environments.  Comment them out if you're not running the container in Cloud Run.

Building and testing:

    $ docker build -t dhtsearch .
    $ docker run --rm -p 8080:80 --name dhtsearch dhtsearch
    $ docker exec -it dhtsearch /bin/sh

### Deploying to Google Cloud Run:

Cloud Run console: https://console.cloud.google.com/run
<br />Artifact Registry console: https://console.cloud.google.com/artifacts

Using the project name drop down at the top of either of the above pages, select or create the project you want to work within ("dhtsearch" in my case)

Create a docker registry within that project and push the dhtsearch container into that registry.  See this [HOWTO](https://cloud.google.com/artifact-registry/docs/docker/quickstart?hl=en_US).

Commands I used to build, test, and push my container from my development system:
<br /><i>(The "northamerica-northeast2-docker.pkg.dev/dhtsearch/docker-containers/" registry portion of these commands refers to my registry in the Google Cloud.  It won't work for you.  You'll need to create your own registry as mentioned above and use its name as part of these commands.)</i>

    $ cd ~/src/dhtserver
    $ docker build -t northamerica-northeast2-docker.pkg.dev/dhtsearch/docker-containers/dhtsearch:YYYYMMDD .
    $ docker run --rm -p 8080:80 --name dhtsearch northamerica-northeast2-docker.pkg.dev/dhtsearch/docker-containers/dhtsearch:YYYYMMDD
    
Browse to http://localhost:8080

    $ docker tag northamerica-northeast2-docker.pkg.dev/dhtsearch/docker-containers/dhtsearch:YYYYMMDD northamerica-northeast2-docker.pkg.dev/dhtsearch/docker-containers/dhtsearch:latest
    $ docker stop dhtsearch
    $ docker push northamerica-northeast2-docker.pkg.dev/dhtsearch/docker-containers/dhtsearch:YYYYMMDD
    $ docker push northamerica-northeast2-docker.pkg.dev/dhtsearch/docker-containers/dhtsearch:latest

Open the container entry in the Artifact Registry console and select "Deploy to Cloud Run" from the the three-dot drop-down menu next to the digest entry.

+ Make sure that region matches the registry's region.
+ Make sure to select "Allow unauthorized invocations" on the second page under "Authentication" to make this a public service
+ Make sure that the port is set to 80

Service URL will be displayed after creation process is complete.

Test the service by browsing to the URL.

The server's console messages are available in the service "Log" tab in the Cloud Run console.

### To update an existing service:

1) Push the new version of the container to the registry using the exact same steps outlined above,
2) Open the service definition in the Google Cloud Run console and, under the "Revisions" tab, select "EDIT & DEPLOY NEW REVISION."   Select the new revision from the registry and deploy it in place of the old.
