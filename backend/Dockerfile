FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies (this builds native modules for the container's architecture)
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
