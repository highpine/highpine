FROM node:latest

RUN npm install nodemon -g

WORKDIR /src/app

EXPOSE 3000