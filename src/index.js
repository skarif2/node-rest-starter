const env = require('./config/environment')
const app = require('./config/server')

app.listen(env.PORT, () => console.info(`Your ${env.NODE_ENV} server is ready and listening on port: ${env.PORT} >_`))
