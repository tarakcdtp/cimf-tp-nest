FROM node:18-slim
LABEL maintainer="formation-cimf@gmail.com"

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src ./src
COPY tsconfig.json ./
COPY tsconfig.build.json ./
RUN npm run build
RUN rm -rf ./src
RUN mkdir /logs

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
