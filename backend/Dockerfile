# Base image
FROM node:20-alpine

# Create app directory
WORKDIR /app/backend/

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY .env ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npx prisma generate
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]