# Use an official Node.js image as the base
FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose the backend port
EXPOSE 5000

# Command to start the backend server
CMD ["npm", "start"]
