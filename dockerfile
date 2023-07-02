FROM node:18-alpine

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json ./
COPY prisma ./prisma/ 


RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
