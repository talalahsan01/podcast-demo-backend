FROM node:20.10

WORKDIR /app

COPY package-lock.json package.json /

RUN npm install --force

COPY . /

EXPOSE 8080

CMD ["npm", "start"]