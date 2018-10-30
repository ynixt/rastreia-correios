FROM node:alpine

WORKDIR /usr/src/app

RUN apk add yarn

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --ignore-engines

COPY . .

EXPOSE 8080

CMD ["yarn", "run", "build:live"]
