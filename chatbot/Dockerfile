# Dockerfile
FROM node:21-alpine3.18 as build

WORKDIR /app
COPY package.json yarn.lock./
RUN yarn

COPY . .
RUN yarn build

FROM node:21-alpine3.18

WORKDIR /app

COPY --from=build /app ./
EXPOSE 3000

CMD ["yarn", "start"]