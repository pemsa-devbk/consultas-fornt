### Stage 1
FROM node:alpine as builder 

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build

### State 2
FROM nginx:stable-alpine-slim

ADD ./config/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /var/www/app/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]