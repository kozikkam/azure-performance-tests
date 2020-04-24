#!/bin/sh
sudo apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get update
sudo apt-get install -y nodejs
sudo apt-get update
script_dir=$(dirname "$0")
sudo apt-get install -y npm
sudo npm install -g pm2
sudo pm2 startup upstart
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup upstart -u atulm --hp /home/atulm
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
pm2 start -f $script_dir/../../index.js
sudo pm2 save