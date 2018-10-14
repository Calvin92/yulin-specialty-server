
const Router = require('koa-joi-router')
const config = require('config')
const router = new Router()

router.prefix(config.apiPrefix)

// User api
const userAPI = require('./user')
router.post('/user/register', userAPI.register)

module.exports = router
