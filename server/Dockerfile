# Dockerfile (Backend)
FROM node:14

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy all files to the container
COPY . .

# Expose port 5000 for backend API
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
