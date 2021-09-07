const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '.env' })

exports.isAuth = (req, res, next) => {
	// llega a travez de la autorization
	const authHeader = req.get('authorization')

	// si no existe, mostramos mensaje
	if (!authHeader)
		return resError(
			res,
			400,
			'Debe de autenticarse para acceder a la aplicación.'
		)

	// si existe
	// obtener el token
	const token = authHeader.split(' ')[1] // convertimos a array y obtenemos el elemento en la pos 1

	// comprobar jwt
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
