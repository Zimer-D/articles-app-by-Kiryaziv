FROM node:16.18.1-alpine
ARG BUILD_CONTEXT
WORKDIR /base
COPY package.json .
COPY yarn.lock .
COPY ./workspaces/$BUILD_CONTEXT/package.json workspaces/$BUILD_CONTEXT/
RUN yarn install
COPY ./workspaces/$BUILD_CONTEXT workspaces/$BUILD_CONTEXT
RUN yarn start:$BUILD_CONTEXT