const UsersService = require('../services/users.service')
const userService = new UsersService()
const { isAdmin } = require('../middlewares/role.checker')
const passportJwt = require('../libs/passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const userData = {} 

    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      secretOrKey: process.env.JWT_SECRET_WORD
    }

    const user = await userService.getUser(id)

    const admin = await isAdmin(id)

    if (!admin) {
      userData.first_name = user.first_name
      userData.last_name = user.last_name
      userData.image_url = user.image_url
    } else {
      user.token = ''
      user.password = ''
      Object.assign(userData, user)
    }

    //Validar si el usuario buscado es el mismo que está tratando de ver la info

    res.status(200).json({
      message: 'User found',
      user: userData
    })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUserById
}
