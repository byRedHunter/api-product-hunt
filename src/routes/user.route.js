const express = require('express')
const {
	createUser,
	loginUser,
	getDataUserAuth,
} = require('../controllers/user.controller')
const { isAuth } = require('../utils/isUserAuth')
const { checkCreateUser, checkLoginUser } = require('../utils/validators')

const router = express.Router()

// api/user

// crear nuevo usuario
router.post('/', checkCreateUser, createUser)

// autenticar usuario - login
router.post('/auth', checkLoginUser, loginUser)

// obtener datos del usuario autenticado
router.get('/auth', isAuth, getDataUserAuth)

module.exports = router
