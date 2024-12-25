FROM node:22-alpine AS frontend-build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./public ./public
COPY ./src ./src

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]