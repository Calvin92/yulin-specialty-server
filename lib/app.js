global.Logger = require('./logger')
const Koa = require('koa')
const app = new Koa()
const router = require('../api')

// 连接 db
require('./db.js')

app.use(router.middleware())

module.exports = app
