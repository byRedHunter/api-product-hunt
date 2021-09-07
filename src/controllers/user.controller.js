const bcrypt = require('bcrypt')
const User = require('../models/User')
const { resError, resSuccess } = require('../utils/response')
const { verifyValidator } = require('../utils/validators')

exports.createUser = async (req, res) => {
	// verificamos errores de express-validator
	verifyValidator(req, res)

	// comenzar con registro de usuario
	const { email, password } = req.body
	// veririficar si el usuario ya esta registrado
	let user = await User.findOne({ email })

	if (user) return resError(res, 400, 'El correo ya ha sido registrado.')

	// crear un nuevo usurio
	try {
		user = new User(req.body)
		// hashear el password
		const salt = await bcrypt.genSalt(10)
		user.password = await bcrypt.hash(password, salt)

		// guardamos al usuario en la db
		await user.save()

		return resSuccess(res, user)
	} catch (error) {
		console.log(error)
		return resError(res, 500, 'Error al crear usuario.')
	}
}

exports.loginUser = async (req, res) => {}

exports.getDataUserAuth = async (req, res) => {}
