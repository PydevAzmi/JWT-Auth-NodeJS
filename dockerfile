# Dockerfile for Express API server
FROM node:alpine
WORKDIR /src
RUN apk --no-cache add \
	bash \
	ca-certificates

# Install dependencies
COPY package*.json /src
COPY . /src
RUN npm install 

CMD [ "npm", "run", "dev" ]