FROM node:20-alpine AS builder

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:20-alpine

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production

COPY --from=builder /usr/app/dist ./dist

EXPOSE 3333

CMD ["node", "dist/shared/infra/http/server.js"]
