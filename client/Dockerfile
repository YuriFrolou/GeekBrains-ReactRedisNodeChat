FROM node:19-alpine As development

WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm install

CMD ["npm run start"]




