FROM node:lts-alpine

RUN npm install -g http-server pnpm

WORKDIR /app

COPY package*.json ./

RUN pnpm install


COPY . .

RUN pnpm run build

EXPOSE 3000

CMD [ "http-server", "dist" ]