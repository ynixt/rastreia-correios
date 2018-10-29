FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN apk add yarn
RUN yarn install --ignore-engines

COPY . .

EXPOSE 8080

CMD ["yarn", "run", "build:live"]
