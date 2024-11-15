#/bin/bash

cd ../backend
deno install

docker compose build && docker compose up