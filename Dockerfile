FROM node:lts
ENV NPM_TOKEN 5e6219a9-cf75-4d1f-b7a7-f32d7440a93c
USER root
WORKDIR /project-generator
COPY . .
RUN npm install -g . && npm link
RUN npm publish