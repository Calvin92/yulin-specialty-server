const config = require('config')
const app = require('./lib/app')

app.listen(config.port, () => {
  Logger.info('应用已启动，监听的端口为：' + config.port)
})