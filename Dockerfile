FROM node:18

WORKDIR /app
COPY . .

RUN yarn && yarn run build && npx prisma migrate deploy

EXPOSE 3000
CMD ["yarn", "run", "start"]
