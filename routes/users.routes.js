const express = require('express')
const router = express.Router()
const passportJwt = require('../libs/passport')

const { getUserById, findVotedPublications, findPublicationsByUser, getUsers } = require('../controllers/users.controller')

router.get('/', passportJwt.authenticate('jwt', {session: false}), getUsers)
router.get('/:id', passportJwt.authenticate('jwt', {session: false}), getUserById)
router.get('/:id/votes', passportJwt.authenticate('jwt', {session: false}), findVotedPublications)
router.get('/:id/publications', passportJwt.authenticate({session: false}), findPublicationsByUser)

module.exports = router