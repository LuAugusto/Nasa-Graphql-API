FROM node:18-alpine

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json ./
COPY prisma ./prisma/ 


RUN npm install

RUN npx prisma generate

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
