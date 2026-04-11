# Use Node.js 20 as the base image
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json .
RUN npm install

# Copy the entire frontend folder into the container
COPY . .

# Start the Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]