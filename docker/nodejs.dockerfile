FROM node:latest

#RUN mkdir /src

#RUN npm install express-generator -g

WORKDIR /src/app
ADD docker/app/.env.json /src/app/.env.json
#RUN npm install

EXPOSE 3000

#CMD bash ./start