# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set working directory
WORKDIR /src

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Use environment variables
ENV NODE_ENV=production

# Start the application
CMD ["node", "src/index.js"]
