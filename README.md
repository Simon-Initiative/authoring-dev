# editor-base

The base repository for running the OLI authoring platform in a
development environment. 

## Prerequisites

This page assumes existing installation of the following software:

1. [docker](https://www.docker.com/docker-mac)
2. [git](https://www.atlassian.com/git/tutorials/install-git)
3. [maven](https://www.mkyong.com/maven/install-maven-on-mac-osx)

This page assumes MacOS as the host operating system.  Some steps
may vary on other platforms.

## Steps

1. Create a `dev.local` alias for localhost.  As superuser, edit `/etc/hosts`
and add the following entry:
    ```
    127.0.0.1     dev.local
    ```
    > A reboot of the host machine OS is not required to pick up the above change.

1. As superuser, create a `/oli` directory and add that directory to the list
of directories shared in Docker.

    1. ```sudo mkdir /oli```
    1. ```sudo chmod -R 777 /oli```
    1. Click the Menubar Docker Icon > Preferences > File Sharing, then add ```/oli``` to list of shared folders

1. You also need some additional files and folders under "/oli"
    1. You will need to checkout a copy of https://svn.oli.cmu.edu/svn/themes/branding/branches/v_5_24/branding into folder /oli/branding by issuing the following command:

        * ```svn co https://svn.oli.cmu.edu/svn/themes/branding/branches/v_5_24/branding/ branding```

    1. Next, take the "superactivity" folder from this tar file (https://drive.google.com/file/d/1z-kUIbR5FlgO_0iDfEHl3An4zMcCuuAd/view?usp=sharing) and place it into the /oli folder
    1. Then, create a folder /oli/repository/presentation:
        1. ```mkdir -p repository/presentation```
    1. Here is the set of new folders you will end up having under /oli
        * /oli/branding
        * /oli/repository/presentation
        * /oli/superactivity
    1. Within /oli/repository/presentation you will checkout themes from svn:
        * ```svn co https://svn.oli.cmu.edu/svn/themes/azool/branches/whirlwind-v_1_4-stable/theme whirlwind-1.4```
        * ```svn co https://svn.oli.cmu.edu/svn/themes/azool/branches/chaperone-v_1_0/theme chaperone-1.0```
    1. You will end up with
        * /oli/repository/presentation/whirlwind-1.4
        * /oli/repository/presentation/chaperone-1.0

1. `cd` into /oli, create a new `sources` folder and git clone the following four repositories into it:
    * [course-editor](https://github.com/Simon-Initiative/course-editor)
    * [content-service](https://github.com/Simon-Initiative/content-service)
    * [editor-base](https://github.com/Simon-Initiative/editor-base)
    * [expression-eval](https://github.com/Simon-Initiative/expression-eval)
    * [achilles](https://github.com/Simon-Initiative/achilles)

1. Install node_modules in course-editor
    * Visual Studio Code and Typescript require that node module dependencies be installed locally for intellisense to work. Run the following commands to install node_modules:

    ```
    $ brew install yarn
    $ cd course-editor
    $ yarn
    ```

1. From the `editor-base` directory, issue the following command:

    ```
    $ docker-compose up
    ```

    The above step will download all necesary docker image files and stand up the containers as
    specified in the `docker-compose.yml` file found in the `editor-base` repository.

      * This step may fail to authenticate with the ssh docker container if you have never logged in before. If experiencing `Service 'ssh-server' failed to build`...`no basic auth credentials`, get login info for the ssh server and on your machine run `docker login [ssh server url]` to store the credentials

1. Once the previous step has reached a steady state (look for "oli-editor| Compiled successfully"
message), issue the following command from the `content-service` directory:

    ```
    $ mvn clean install
    ```

    The above command builds a clean version of the Java-based `content-service` and deploys it
    into the running JBoss application server container. If during development one makes
    code changes to the `content-service`, this step can be repeated to redeploy the
    latest `content-service`.

1. Go to <http://dev.local/auth/> and go to "Administration Console." From there, get credentials and login.
    * Navigate to "Users" and then go to "Add User." From there, create an account and tick "Email Verified" to be off. 
    * After adding the user, click on the ID of the newly created account. Navigate to "Role Mappings" and then add all the available roles. 

1. Open Chrome web-browser to <http://dev.local> and log in wiht credentials created previously.
    * Note that in order to create courses you will need to get a course template from svn, and users created will need to be given permission to create courses in keycloak
