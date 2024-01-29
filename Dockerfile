# Nodejs image
FROM node:alpine3.19

# Create user and group
RUN addgroup app && adduser -S -G app app

# Create working directory
WORKDIR /app

# Optimise nodejs libs for Production
ENV NODE_ENV production

# COPY package.json && package-lock.json
COPY package*.json /app

# Install npm dependencies & run audit fix for dependencies
RUN npm ci --only=production

# COPY contents to app
COPY /dist /app

# Set user
USER app

# Expose Port
EXPOSE 8001

# Execute App
ENTRYPOINT ["npm", "start"]
