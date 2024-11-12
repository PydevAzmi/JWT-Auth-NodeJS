# Dockerfile for Express API server
FROM node:alpine
WORKDIR /src
COPY package.json /src
RUN npm install
COPY . /src
CMD ["node", "index.js"]