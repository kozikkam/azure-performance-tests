sudo curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install git
git clone https://github.com/kozikkam/azure-performance-tests.git
cd azure-performance-tests/
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
npm install
npm run start:prod
