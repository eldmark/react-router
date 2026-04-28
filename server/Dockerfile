FROM node:24-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY server ./server

EXPOSE 3001

CMD ["npm", "run", "server"]