# Frontend React Application Dockerfile
#
# This Dockerfile creates a containerized environment for the Roman Numeral
# Converter React frontend. It uses Node.js 20 Alpine for development.
#
# @author Interview Candidate
# @version 1.0.0

# Use Node.js 20 Alpine as the base image for smaller size and security
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the development server port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]