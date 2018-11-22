const env = require('./config/environment')
const app = require('./config/express')

app.listen(env.PORT, () => console.info(`node-rest-starter app listening on port ${env.PORT} :: ${env.NODE_ENV} server`))
