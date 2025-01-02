FROM node:22-alpine AS frontend-build
WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install react-bootstrap bootstrap

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]