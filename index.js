const env = require('./config/environment')
const app = require('./config/server')
const routes = require('./src/index.router')

app.use('/api', routes)

app.listen(env.PORT, () => console.info(`Your ${env.NODE_ENV} server is ready and listening on port: ${env.PORT} >_`))
