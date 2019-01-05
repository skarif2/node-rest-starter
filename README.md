# Node Rest Starter 🌿

[![Build Status](https://travis-ci.com/skarif2/node-rest-starter.svg?branch=master)](https://travis-ci.com/skarif2/node-rest-starter)
[![Coverage Status](https://coveralls.io/repos/github/skarif2/node-rest-starter/badge.svg?branch=master)](https://coveralls.io/github/skarif2/node-rest-starter?branch=master)
[![dependencies Status](https://david-dm.org/skarif2/node-rest-starter/status.svg)](https://david-dm.org/skarif2/node-rest-starter)
[![Maintainability](https://api.codeclimate.com/v1/badges/6efa84bef371d1d8a145/maintainability)](https://codeclimate.com/github/skarif2/node-rest-starter/maintainability)
[![Inline docs](http://inch-ci.org/github/skarif2/node-rest-starter.svg?branch=master)](http://inch-ci.org/github/skarif2/node-r`est-starter)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://img.shields.io/badge/license-MIT-brightgreen.svg)

A boilerplate for creating RESTful APIs in Node.js using Express and MongoDB. It is written with all the best practices in the world :blush:

<br />

<div align="center">
  <img src="https://user-images.githubusercontent.com/5141132/50723408-8aa4a500-1107-11e9-9fe6-fe5482102bc9.png" height="45" hspace="10">
  <img src="https://user-images.githubusercontent.com/5141132/50723399-7365b780-1107-11e9-9bc4-7706f631c5e8.png" height="45" hspace="10">
  <img src="https://user-images.githubusercontent.com/5141132/50723395-65b03200-1107-11e9-8cfc-03e765c81d8e.png" height="45" hspace="10">
  <img src="https://user-images.githubusercontent.com/5141132/50726877-3ae0d080-113d-11e9-8298-ac422d21c131.png" height="32" hspace="10">
  <img src="https://user-images.githubusercontent.com/5141132/50723392-5335f880-1107-11e9-9559-cd725e3c3907.png" height="30" hspace="10">
</div>

<br />

## Technologies

- [Node.js](https://nodejs.org/en/), [Express](http://expressjs.com/), [Javascript](https://github.com/sorrycc/awesome-javascript), [npm](https://www.npmjs.com/) - core platform
- [Helmet](https://www.npmjs.com/package/helmet), [compression](https://www.npmjs.com/package/compression), [cors](https://www.npmjs.com/package/cors) - common middlewares
- [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/) - database and schema modeling
- [JWT](https://www.npmjs.com/package/jsonwebtoken), [express-jwt](https://www.npmjs.com/package/express-jwt) - generate and validate access token
- [Joi](https://www.npmjs.com/package/joi), [express-validation](https://www.npmjs.com/package/express-validation) - param validation
- [Consola](https://www.npmjs.com/package/consola), [Logger](https://www.npmjs.com/package/@skarif2/logger) - better console logging stuff
- [ESLint](https://eslint.org/) - check and fix linting of code
- [Jest](https://jestjs.io/) - unit testing javascript code and api
- [Husky](https://www.npmjs.com/package/husky) - precommit hooks for git
- [apiDoc](http://apidocjs.com/) - documentation for RESTful apis

## Getting Started

### **Prerequisites**
- [Node.js](https://nodejs.org/en/) v10.3.0 or higher to support [ES2018](https://node.green/) syntax.
- [MongoDB](https://www.mongodb.com/) v3.0.x or higher [[more](https://mongoosejs.com/docs/compatibility.html)].

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

### **Linting**
```sh
# Lint code using ESLint
$ npm run lint
```

### **Docker**
```sh
# Build docker image
$ docker-compose build

# Start newly built image
$ docker-compose up
```

### **Api Doc**
Inline documentation for RESTful APIs. ApiDoc creates a documentation from API annotations in the source code. [[more](http://apidocjs.com/)]
ApiDoc [demo](https://skarif2.github.io/node-rest-starter/) for this repo.
```sh
# Generate documentation for RESTful Api
$ npm run apidoc
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

## Development Screenshots

### API logs
<img src="https://user-images.githubusercontent.com/5141132/50728024-ff9acd80-114d-11e9-9f17-dd8ca5a161b4.png" align="center">
<img src="https://user-images.githubusercontent.com/5141132/50728026-0d505300-114e-11e9-83d0-a80b99862977.png" align="center">
<img src="https://user-images.githubusercontent.com/5141132/50728030-193c1500-114e-11e9-8202-08c0a3250d23.png" align="center">

### Test logs
<img src="https://user-images.githubusercontent.com/5141132/50728035-25c06d80-114e-11e9-8e72-e85bf5a63bb5.png" align="center">

## Highly Inspired by

- [Express & mongoose REST API Boilerplate in ES6 with Code Coverage](https://github.com/kunalkapadia/express-mongoose-es6-rest-api)
- [Vue, Express, MongoDB full-stack JS Boilerplate](https://github.com/icebob/vue-express-mongo-boilerplate)
- [Node.js API Starter Kit](https://github.com/kriasoft/nodejs-api-starter)

## License

This project available under the [MIT license](https://github.com/skarif2/node-rest-starter/blob/master/LICENSE).

---
<h3 align="center">Made with&nbsp; 💖 &nbsp;by Sk Arif.</h2>