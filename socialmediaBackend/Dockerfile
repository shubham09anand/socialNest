# Dockerfile in socialmediaBackend folder
# Node.js version as a base image
FROM node:20

# Working directory
WORKDIR /app

# package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the code of application
COPY . .

# Expose the port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
