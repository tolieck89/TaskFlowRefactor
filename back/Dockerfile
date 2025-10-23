FROM node:18-alpine
WORKDIR /data
RUN npm install -g json-server
EXPOSE 3001
CMD ["json-server", "--watch", "/data.json", "--port", "3001"]