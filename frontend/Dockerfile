FROM node:22-alpine AS build

RUN npm config set registry https://registry.npmjs.org/

WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install

FROM build AS dev
CMD ["npm", "run", "serve"]
EXPOSE 4200


FROM build AS prod
RUN npm run build

FROM nginx:latest AS ngi
COPY --from=prod /usr/local/app/dist/angular-app/browser /usr/share/nginx/html
COPY --from=build /usr/local/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443