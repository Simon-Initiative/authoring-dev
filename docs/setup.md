# Setup Instructions

## Prerequisites

This page assumes existing installation of the following software:

1. [docker](https://www.docker.com/docker-mac)
1. [git](https://www.atlassian.com/git/tutorials/install-git)
1. [maven](https://www.mkyong.com/maven/install-maven-on-mac-osx)
1. [wget](https://www.cyberciti.biz/faq/howto-install-wget-om-mac-os-x-mountain-lion-mavericks-snow-leopard/)

This page assumes macOS as the host operating system.  Some steps may vary on other platforms.

## Steps

1. Create a `dev.local` alias for localhost.  As superuser, edit `/etc/hosts`
and add the following entry:

    ```text
    127.0.0.1     dev.local
    ```
  
    > A reboot of the host machine OS is **not** required to pick up the above change.

1. Create an `~/oli` directory and add that directory to the list
of directories shared in Docker. In macOS 10.15 Catalina and up users do not have access to the root `/`, so this directory must live somewhere in the user home directory.

    1. ```mkdir ~/oli```
    1. ```chmod -R 777 ~/oli```
    1. Click the Menubar Docker Icon > Preferences > File Sharing, then add ```~/oli``` to list of shared folders

1. You also need some additional files and folders under "~/oli"
    1. Within ~/oli issue the following commands:
        * ```wget https://s3.amazonaws.com/oli-cdn/branding.tgz```
        * ```tar -xvzf branding.tgz```
    1. Next 
        * ```wget https://s3.amazonaws.com/oli-cdn/quick_preview_support.tgz```
        * ```tar -xvzf quick_preview_support.tgz```
    1. Download dtd
        * ```wget https://s3.amazonaws.com/oli-cdn/oli-dtd.tgz```
        * ```tar -xvzf oli-dtd.tgz```
    1. Then, create a folder ~/oli/repository/presentation:
        1. ```mkdir -p repository/presentation```
    1. Here is the set of new folders you will end up having under ~/oli
        * ~/oli/branding
        * ~/oli/repository/presentation
        * ~/oli/superactivity
        * ~/oli/dtd
    1. Within ~/oli/repository/presentation, issue the following commands:
        * ``` cd ~/oli/repository/presentation```
        * ```wget https://s3.amazonaws.com/oli-cdn/themes.tgz```
        * ```tar -xvzf themes.tgz```
    1. You will end up with
        * ~/oli/repository/presentation/whirlwind-1.4
        * ~/oli/repository/presentation/chaperone-1.0
    1. Create content folder
       ```sh
       mkdir -p ~/oli/content/course_content_xml
       mkdir -p ~/oli/content/webcontent
       cd ~/oli/content/course_content_xml
       wget https://s3.amazonaws.com/oli-cdn/template.tgz
       tar xzfv template.tgz
      ```

1. `cd` into ~/oli, create a new `sources` folder and git clone the following four repositories into it:
    * [authoring-client](https://github.com/Simon-Initiative/authoring-client)
    * [authoring-server](https://github.com/Simon-Initiative/authoring-server)
    * [authoring-dev](https://github.com/Simon-Initiative/authoring-dev)
    * [authoring-eval](https://github.com/Simon-Initiative/authoring-eval)
    * [authoring-admin](https://github.com/Simon-Initiative/authoring-admin)

    ```sh
    cd ~/oli
    mkdir sources
    cd sources
    git clone https://github.com/Simon-Initiative/authoring-client
    git clone https://github.com/Simon-Initiative/authoring-server
    git clone https://github.com/Simon-Initiative/authoring-dev
    git clone https://github.com/Simon-Initiative/authoring-eval
    git clone https://github.com/Simon-Initiative/authoring-admin
    ```

1. Copy configuration files
    1. Copy and customize required configuration files
      ```sh
       mkdir ~/oli/service_config
       cp ~/oli/sources/authoring-server/conf/content-service-conf.example.json ~/oli/service_config/content-service-conf.json
       # make configuration modifications
       vim ~/oli/service_config/content-service-conf.json
      ```
    1. Copy and customize authoring-server environmental variable file
       ```sh
       cd ~/oli/sources/authoring-server
       cp service.example.envs service.envs
       # make configuration modifications
       vim service.envs
       ```
    1. Copy and customize docker-compose.override.yml file. (only customize if you chose a different directory other than ~/oli)

      ```
      cd ~/oli/sources/authoring-dev
      cp docker-compose.override.example.yml docker-compose.override.yml
      ```

1. Create docker images
    * Create a build of authoring-server used for the initial run

      ```sh
      cd ~/oli/sources/authoring-server
      mvn clean package
      ```

    * From the `authoring-dev` directory, build docker images

      ```sh
      cd ~/oli/sources/authoring-dev
      docker-compose build
      ```

1. Install node_modules in authoring-client
    * Visual Studio Code and Typescript require that node module dependencies be installed locally for intellisense to work. Run the following commands to install node_modules:

      ```sh
      brew install yarn      # or using npm: npm install -g yarn
      cd ~/oli/sources/authoring-client
      yarn
      ```

    * Start the web application development server

      ```sh
      yarn run dev
      ```

1. From the `authoring-dev` directory, issue the following command:

    ```sh
    cd ~/oli/sources/authoring-dev
    docker-compose up
    ```

    The above step will download all necessary docker image files and stand up the containers as
    specified in the `docker-compose.yml` file found in the `authoring-dev` repository.

1. Once the previous step has reached a steady state (look for `authoring-server | Started X of Y services (Z services are lazy, passive or on-demand)` message), issue the following command from the `authoring-server` directory:

    ```sh
    cd ~/oli/sources/authoring-server
    mvn clean install
    ```

    The above command builds a clean version of the Java-based `authoring-server` and deploys it into the running JBoss application server container. If during development one makes code changes to the `authoring-server`, this step can be repeated to redeploy the latest `authoring-server`.

1. Go to <http://dev.local/auth/> and go to "Administration Console." From there, login using default keycloak credentials username: `admin` and password: `admin`.
    * Navigate to "Users" and then go to "Add User." From there, create an account and tick "Email Verified" to be **off**.
    * After adding the user, click on the ID of the newly created account. Navigate to "Role Mappings" and then add all the available roles.
    * Navigate to Credentials and set a password for the new admin user, tick "Temporary" to be **off**
    * Then, using the left sidebar, navigate to "Clients" and click on the "content_client" Client ID. Set the following fields:

      | Field | Value |
      | ---- | ----- |
      | Root URL | `http://dev.local:9000` |
      | Valid Redirect URIs | `*` |
      | Web Origins  | `*` |

1. Open Chrome web-browser to <http://dev.local:9000> and log in with admin credentials created previously.
    * Note that in order to create courses you will need to get a course template from svn, and users created will need to be given permission to create courses in keycloak

      
