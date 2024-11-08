#/bin/bash
sudo docker build -t app . && sudo docker run -it -p 8080:8080 app