FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . . 

RUN chmod +x entrypoint.sh

CMD ["sh", "/app/entrypoint.sh"]
