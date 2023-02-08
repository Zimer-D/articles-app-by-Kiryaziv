FROM node:16.18.1-alpine
ARG BUILD_CONTEXT
WORKDIR /base
COPY package.json .
COPY yarn.lock .
COPY ./apps/$BUILD_CONTEXT/package.json apps/$BUILD_CONTEXT/
RUN yarn install
COPY ./apps/$BUILD_CONTEXT apps/$BUILD_CONTEXT
RUN yarn start:$BUILD_CONTEXT