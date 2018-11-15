const express = require('express')
const environment = require('./setup/environment')
const app = express()
const port = 9100

console.log(environment)

app.get('/', (req, res) => res.send('Hello from Node-Rest-Starter!'))

app.listen(port, () => console.log(`Node-Rest-Starter app listening on port ${port}!`))