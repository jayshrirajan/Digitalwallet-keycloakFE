# Fetching the latest node image on alpine linux
FROM node:alpine

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /digitalWallet

# Installing dependencies
COPY ./package.json /digitalWallet
RUN npm install

# Copying all the files in our project
COPY . .

# Starting our application
CMD npm run start