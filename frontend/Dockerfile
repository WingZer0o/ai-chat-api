# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:alpine as build
# Expose port 80
EXPOSE 80
EXPOSE 4200

RUN npm config set registry https://registry.npmjs.org/

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

CMD ["npm", "run", "serve"]
