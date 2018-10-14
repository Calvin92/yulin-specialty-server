const { Joi } = require('koa-joi-router')
const Boom = require('boom')
const { User } = require('../model')
const { mobileRegex } = require('../utils/regex')

// 用户名 & 密码 & 手机号 注册
exports.register = {
  validate: {
    type: 'json',
    body: {
      nickname: Joi.string().trim()
        .description('用户昵称')
        .min(1)
        .max(64)
        .required(),
      mobile: Joi.string().trim()
        .description('用户手机')
        .regex(mobileRegex)
        .required(),
      passport: Joi.string()
        .description('用户密码')
        .min(8)
        .max(32)
        .required(),
    },
  },

  handler: async (ctx, next) => {
    const { nickname, mobile, passport } = ctx.request.body

    const exists = await User.findOne({ mobile })
    if (exists) throw Boom.conflict('该手机号已经被注册过了')

    const user = await User.create({
      nickname,
      mobile,
      passport,
    })

    ctx.body = user
  },
}
