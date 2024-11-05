# Step 1: Use Node.js as the base image
FROM node:14

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the app files into the container
COPY . .

# Step 6: Build the React app for production
RUN npm run build

# Step 7: Install serve to serve the static files
RUN npm install -g serve

# Step 8: Expose the port that the app will run on
EXPOSE 3000

# Step 9: Command to serve the app
CMD ["serve", "-s", "build"]
