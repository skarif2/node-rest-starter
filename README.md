# Node Rest Starter Kit 

[![Build](https://travis-ci.com/skarif2/node-rest-starter.svg?branch=master)](https://travis-ci.com/skarif2/node-rest-starter)
[![Coverage](https://coveralls.io/repos/github/skarif2/node-rest-starter/badge.svg?branch=master)](https://coveralls.io/github/skarif2/node-rest-starter?branch=master)
[![Dependencies](https://david-dm.org/skarif2/node-rest-starter/status.svg)](https://david-dm.org/skarif2/node-rest-starter)
[![Maintainability](https://api.codeclimate.com/v1/badges/05aac0c011555564f95e/maintainability)](https://codeclimate.com/github/skarif2/nodejs-api-starter/maintainability)
[![Inline docs](http://inch-ci.org/github/skarif2/node-rest-starter.svg?branch=master)](http://inch-ci.org/github/skarif2/node-rest-starter)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://img.shields.io/badge/license-MIT-brightgreen.svg)

<br>

A boilerplate for creating RESTful APIs in Node.js using Express and MongoDB. It is written in ES2015/ES6 with 95% code coverage and all the best practices in Javascript world to keep you more productive.

## Concept
  - Functional
  - Immutable
  - ES2015/ES6 (no babel)
  - async/await
  - Docker
  - npm (no yarn)

## Fundamentals
  - Router > Controller > Model (Express)
  - Middleware
  - Helper
  - Pipes (validation, apierror)
  - Guards (Authorizaion)
  - Test

## Techniques
  | Name | Module | Summery |
  |-|-|-|
  |Authentication|jsonwebtoken|some summery|
  |Build System|docker|some summery|
  |Caching|cache-manager|some summery|
  |Compression|compression|some summery|
  |Configuration|dotenv|some summery|
  |Database|mongoose| some summery|
  |Email, SMS, PUSH|donemailer, twilio, firebase| some summery|
  |File Upload|multer|some summery|
  |Http-request|node-fetch|some summery|
  |Http Status Code|http-status|some summery|
  |Logger|morgan, winston, pretty-error|some summery|
  |Route>Controller>Model|express|some summery|
  |Serialization|-|some summery|
  |Security|helmet, cors, csrf|some summery|
  |Test|jest|some summery|
  |Validation|joi|some summery|

## To-Do
  - [x] ~~Readme file with a to-do~~
  - [x] ~~Basic express app~~
  - [x] ~~Configuration file~~
  - [x] ~~dotenv support~~
  - [x] ~~Folder structure~~
  - [x] ~~Logger (readable logging, color)~~
  - [x] ~~Validation/param-validation~~
  - [x] ~~Database connectivity~~
  - [x] ~~Eslint support~~
  - [x] ~~Security modules~~
  - [x] ~~User's CRUD api~~
  - [x] ~~Auth api for user (JWT)~~
  - [x] ~~Error response (HTTP-Status)~~
  - [ ] ~~File Upload~~
  - [ ] ~~Docker (Everyting)~~
  - [x] ~~Hot-reload~~
  - [ ] Documentation

## Logs
  - `env.LOG_LEVEL` determines which level of logs to be printed on the console. See winston for more info
  - only `env.NODE_ENV=prod` will save logs in ```__logs__``` folder
  - `env.NODE_ENV` will generate no logs
  - `dev` and `stage` should and will provide save level of logging
  - `env.NODE_ENV` has no effect on logs levels but in `prod` all logs which will be saved in ```__logs__``` folder will have a log level of `info`
  - `pretty-error` will print only errors with provided styles
  - in `den` and `stage` morgan will print separate logs with `req` and `res` info using `winston`
  - in `prod` no logs will be printed by `morgan` on the console if the `env.LOG_LEVEL` is set to `error`
  - by default in `prod` saved logs has a max file size of `20mb` and log-files will be deleted once it is `15 days` old which can be changed by editing `/config/winston.js`

