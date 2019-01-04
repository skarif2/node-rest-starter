# Node Rest Starter 🌿

[![Build Status](https://travis-ci.com/skarif2/node-rest-starter.svg?branch=master)](https://travis-ci.com/skarif2/node-rest-starter)
[![Coverage Status](https://coveralls.io/repos/github/skarif2/node-rest-starter/badge.svg?branch=master)](https://coveralls.io/github/skarif2/node-rest-starter?branch=master)
[![dependencies Status](https://david-dm.org/skarif2/node-rest-starter/status.svg)](https://david-dm.org/skarif2/node-rest-starter)
[![Maintainability](https://api.codeclimate.com/v1/badges/6efa84bef371d1d8a145/maintainability)](https://codeclimate.com/github/skarif2/node-rest-starter/maintainability)
[![Inline docs](http://inch-ci.org/github/skarif2/node-rest-starter.svg?branch=master)](http://inch-ci.org/github/skarif2/node-r`est-starter)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://img.shields.io/badge/license-MIT-brightgreen.svg)

A boilerplate for creating RESTful APIs in Node.js using Express and MongoDB. It is written with all the best practices in the world :blush:

## Technologies
- add techlonogy here

## Getting Started

### **Prerequisites**
- [Node.js](https://nodejs.org/en/) v10.3.0 or higher to support [ES2018](https://node.green/) syntax.
- [MongoDB](https://www.mongodb.com/) v3.0.x or higher ([more](https://mongoosejs.com/docs/compatibility.html)).

### **Initial Setup**
```sh
# Clone the repo
$ git clone git@github.com:skarif2/node-rest-starter.git awesomeapi

# Change directory to newly created one
$ cd awesomeapi

# Install dependencies
$ npm install

# Setup environment
$ cp .env.example .env

# Start development server
$ npm start

# Watch for file changes
$ npm run start:watch

# Run server in debug mode
$ npm run start:debug
```

### **Testing**
```sh
# Run tests in normal mode
$ npm test

# Run tests in watch mode
$ npm run test:watch

# Generate coverage report for tests
$ npm run test:coverage
```

### **Lninting**
```sh
# Lint code using ESLint
$ npm run lint
```

### **Api Doc**
```sh
# Generate documentation for RESTful Api
$ npm run apidoc
```

### **Docker**
```sh
# Build docker image
$ docker-compose build

# Start newly built image
$ docker-compose up
```

## Directory Structure
```txt
+
+---docs
+---src
|   +---__test__
|   +---api
|   |   +---auth
|   |   |      auth.controller.js
|   |   |      auth.param.js
|   |   |      auth.route.js
|   |   +---user
|   |   |      user.controller.js
|   |   |      user.model.js
|   |   |      user.param.js
|   |   |      user.route.js
|   +---config
|   |       environment.js
|   |       express.js
|   |       mongoose.js
|   +---libs
|   |       APIError.js
|   |       jwToken.js
|   +---middleware
|   |   index.js
|   |   index.route.js
|   package.json
|   .env
```