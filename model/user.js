const mongoose = require('mongoose')
const Joigoose = require('joigoose')(mongoose)
const { Joi } = require('koa-joi-router')

const joiSchema = {
  nickname: Joi.string()
    .description('用户昵称'),

  mobile: Joi.string().trim()
    .allow('')
    .description('手机')
    .meta({
      select: false,
    }),

  wechat_auth: Joi.string().trim()
    .description('微信授权信息')
    .meta({
      select: false,
    }),

  qq_auth: Joi.string().trim()
    .description('qq 授权信息')
    .meta({
      select: false,
    }),

  passport: Joi.string()
    .description('用户密码')
    .min(8)
    .max(32)
    .meta({
      select: false,
    }),

  email: Joi.string().email()
    .description('用户邮箱'),

  avatar: Joi.string().trim()
    .description('用户头像'),
}

const joi = Joi.object(joiSchema)
  .options({
    allowUnknown: true,
  })

const schema = new mongoose.Schema(Joigoose.convert(joi), { timestamps: true })

module.exports = mongoose.model('User', schema)
module.exports.joiSchema = joiSchema
