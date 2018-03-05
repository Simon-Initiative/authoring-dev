#!/bin/bash

__create_user() {
# Create a user to SSH into as.
useradd user
SSH_USERPASS=$SSH_PASSWORD
echo -e "$SSH_USERPASS\n$SSH_USERPASS" | (passwd --stdin user)
echo ssh user password: $SSH_USERPASS
}

# Call all functions
__create_user