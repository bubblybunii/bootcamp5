FROM node:alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]