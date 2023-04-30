FROM node:14-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod
FROM nginx:alpine
COPY --from=build-step /app/dist/prac1-angular /usr/share/nginx/html
COPY --from=build-step /app/nginx-custom.conf /etc/nginx/conf.d/default.conf
