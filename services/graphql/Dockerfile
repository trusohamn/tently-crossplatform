FROM node:10.15.0-alpine
EXPOSE 4000 9229

RUN mkdir -p /home/app
WORKDIR /home/app

COPY package.json tsconfig.json ./

RUN yarn install

COPY src ./src

CMD yarn start