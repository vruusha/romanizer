# Backend API Dockerfile
#
# This Dockerfile creates a containerized environment for the Roman Numeral
# Converter backend API. It uses Node.js 20 Alpine for a lightweight image.
#
# @author Interview Candidate
# @version 1.0.0

# Use Node.js 20 Alpine as the base image for smaller size and security
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /backend

# Copy package files first for better Docker layer caching
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["node", "index.js"]