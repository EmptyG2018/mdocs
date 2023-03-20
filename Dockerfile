FROM node:16
WORKDIR /app
COPY . .
RUN npm --registry https://registry.npm.taobao.org install

RUN npm cache clean --force

RUN npm run build
EXPOSE 4173
CMD ["yarn", "preview"]