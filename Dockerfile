FROM node:20-bookworm

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci
RUN npx -y playwright@1.41.1 install --with-deps

COPY . . 

RUN chmod +x entrypoint.sh

CMD ["sh", "/app/entrypoint.sh"]
