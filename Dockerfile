FROM node:18

WORKDIR /app
COPY . .

RUN yarn && yarn run build

EXPOSE 3000
CMD ["yarn run start"]
