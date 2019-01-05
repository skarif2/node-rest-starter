# Use latest node version 10.x
FROM node:10.15.0

# Create app directory in container
RUN mkdir -p /app

# Set /app directory as default working directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
ADD package.json /app/

# If you are building your code for production
# RUN npm install --only=production
RUN npm install

# Copy all file from current dir to /app in container
COPY . /app/

# Expose port 9100
EXPOSE 9100

# CMD to start service
CMD [ "npm", "start" ]