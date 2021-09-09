const jwt = require('jsonwebtoken')
const { resError } = require('./response')
require('dotenv').config({ path: '.env' })

exports.isAuth = (req, res, next) => {
	// llega a travez del header de req
	const token = req.header('auth-token')

	// si no existe, mostramos mensaje
	if (!token)
		return resError(
			res,
			400,
			'Debe de autenticarse para acceder a la aplicación.'
		)

	// comprobar token con jwt
	try {
		// token correcto
		const user = jwt.verify(token, process.env.SECRET)
		// retorna al usuario --> pasa usuario al siguiente middelware
		req.user = user

		// pasamos al siguiente middelware
		return next()
	} catch (error) {
		// token incorrecto
		console.log(error)
		return resError(res, 400, 'Token incorrecto.')
	}
}
