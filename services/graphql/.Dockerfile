FROM node:14-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json tsconfig.json ./
RUN yarn install
COPY src ./src
RUN chmod +x /wait


EXPOSE 4000
CMD /wait && ./scripts/start.sh
