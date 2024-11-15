FROM node:alpine as build
EXPOSE 4200

RUN npm config set registry https://registry.npmjs.org/

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

CMD ["npm", "run", "serve"]
