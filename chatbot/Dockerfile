# Dockerfile
FROM node:21-alpine3.18 as build

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:21-alpine3.18

WORKDIR /app

COPY --from=build /app ./
RUN npm install -g serve

CMD ["serve", "-p", "3000", "-s", "build"]