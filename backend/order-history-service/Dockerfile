FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install cors

COPY . .

EXPOSE 5007
CMD ["npm", "start"]