FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install cors

COPY . .

EXPOSE 5005
CMD ["npm", "start"]