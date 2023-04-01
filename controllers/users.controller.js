const UsersService = require('../services/users.service')
const userService = new UsersService()
const { isAdmin } = require('../middlewares/role.checker')
const { ExtractJwt } = require('passport-jwt')
const { getIdFromToken } = require('../utils/tokens.funcitons')

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const userData = {} 

    const authHeader = req.headers['authorization']
    const searcherUserId = getIdFromToken(authHeader)

    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      secretOrKey: process.env.JWT_SECRET_WORD
    }

    const user = await userService.getUser(id)

    const admin = await isAdmin(searcherUserId)

    if (admin || searcherUserId == id) {
      user.token = ''
      user.password = ''
      Object.assign(userData, user)
    } else {
      userData.first_name = user.first_name
      userData.last_name = user.last_name
      userData.image_url = user.image_url
    }

    res.status(200).json({
      message: 'User found',
      user: userData
    })

  } catch (error) {
    next(error)
  }
}

const findVotedPublications = async (req, res) => {
  const { id } = req.params

  const { limit, size } = req.query

  const publications = await userService.getVotedPublications(id, limit, size)

  res.status(200).json({
    message: 'Publications retrieved successfully',
    publications
  })
}

const findPublicationsByUser = async (req, res, next) => {
  const { id, limit, size } = req.params

  try {
    const publications = await userService.getPublicationsCreatedByUser(id)

    res.status(200).json({
      message: 'Publications retrieved successfully',
      publications
    })
  
  } catch(error) {
    next(error)
  }

}

const editUserData = async (req, res, next) => {
  const { id } = req.params
  const { first_name, last_name, code_phone, phone, country } = req.body
  const userObj = {}
  Object.assign(userObj, {
    first_name, last_name, phone, code_phone, country
  })

  try {
    const user = userService.updateUser(id, userObj)

    res.status(200).json({
      message: 'User updated successfully'
    })
  } catch(error) {
    next(error)
  }
}

const getUsers = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const userId = getIdFromToken(authHeader)

  const filters = req.query

  const users = {}
  

  try {
    if (await isAdmin(userId)) {
      if (!filters)
        Object.assign(users, await userService.findAllUsers())
      else 
        Object.assign(users, await userService.findAndCount(filters))
      
      res.status(200).json({
        message: 'Users retreived successfully',
        users
      })
    }  else {
      res.status(400).json({
        message: 'You cannot see users information'
      })
    }
  } catch(error) {
    next(error)
  }

}

module.exports = {
  getUserById,
  findVotedPublications,
  findPublicationsByUser,
  getUsers
}

