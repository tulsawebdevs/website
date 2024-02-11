FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . . 

RUN chmod +x entrypoint.sh

ENTRYPOINT ["sh", "/app/entrypoint.sh"]
