#!/bin/bash

__create_user() {
    # Create a user to SSH into
    user='user'
    if [ $(getent passwd $user) ] ; then
        echo user $user exists
    else
        useradd user
        SSH_USERPASS=$SSH_PASSWORD
        echo -e "$SSH_USERPASS\n$SSH_USERPASS" | (passwd --stdin user)
        echo ssh user password: $SSH_USERPASS
    fi
}

# Call all functions
__create_user