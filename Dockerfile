# builder
FROM node:20-alpine as builder

WORKDIR /usr/app

COPY ./package.json ./package.json
RUN npm install

COPY ./src ./src
COPY ./tsconfig.json ./tsconfig.json
RUN npm i -g typescript
RUN npm run build

# runner
FROM node:20-alpine as runner

WORKDIR /usr/app

COPY --from=builder /usr/app/package.json ./package.json
COPY --from=builder /usr/app/package-lock.json ./package-lock.json
RUN npm ci

COPY --from=builder /usr/app/dist ./dist

CMD npm run start:prd
