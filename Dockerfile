FROM node as buildfrontend
WORKDIR /app
COPY . .
RUN npm install
RUN npx ng build --configuration=production

FROM nginx
WORKDIR /usr/share/nginx/html
COPY --from=buildfrontend /app/dist/my-notes-app-fe/ ./
WORKDIR /etc/nginx/conf.d
COPY ./default.conf .
EXPOSE 80