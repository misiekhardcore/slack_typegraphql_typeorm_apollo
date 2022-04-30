FROM node:alpine
ENV NODE_VERSION 17.1.0
ENV NODE_ENV production
WORKDIR /app
COPY package.json .
COPY ormconfig.js .
COPY .env .
RUN yarn
COPY dist .
CMD ["node","index.js"]
USER node