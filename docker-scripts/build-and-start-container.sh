#/bin/bash

cd ../backend
deno install

cd ../frontend
deno install --allow-scripts

docker compose build && docker compose up