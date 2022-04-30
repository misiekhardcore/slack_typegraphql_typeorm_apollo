FROM node:alpine
ENV NODE_VERSION 17.1.0
WORKDIR /app
COPY package.json .
RUN yarn
COPY build .
CMD ["npm","run","serve"]