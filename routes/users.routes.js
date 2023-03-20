const express = require('express')
const router = express.Router()
const passportJwt = require('../libs/passport')

const { getUserById } = require('../controllers/users.controller')

router.get('/:id', passportJwt.authenticate('jwt', {session: false}), getUserById)

module.exports = router