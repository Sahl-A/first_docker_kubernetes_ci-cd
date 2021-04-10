FROM node:15.13.0-alpine3.10

WORKDIR /app-posts

RUN apk --no-cache add curl 

COPY package.json package.json
COPY . /app-posts

RUN yarn

CMD ["node", "/app-posts/index.js"]