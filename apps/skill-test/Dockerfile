# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/skill-test

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build skill-test

# Start the server using the production build
CMD [ "node", "dist/apps/skill-test/main.js" ]
