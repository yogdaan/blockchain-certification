FROM node:carbon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app/

# Bundle app source
COPY . /usr/src/app

EXPOSE 80
RUN npm install
RUN npm install --prefix client 
RUN npm run build --prefix client
ENV NODE_ENV production

# Add your preference
CMD [ "npm", "start" ]