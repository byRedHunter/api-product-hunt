const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

exports.loginUser = async (req, res) => {
	// verificar errores de express-validator
	verifyValidator(req, res)

	// verificar si el usuario ya esta registrado
	const { email, password } = req.body
	const user = await User.findOne({ email })

	if (!user) return resError(res, 401, 'Para acceder debe de crear una cuenta.') // 401 credenciales incorrectas

	// verificar password
	if (!bcrypt.compareSync(password, user.password))
		return resError(res, 401, 'El correo o la contraseña son incorrectos.')

	// autenticar usuario
	const token = jwt.sign(
		{
			id: user._id,
			name: user.name,
			email: user.email,
		},
		process.env.SECRET,
		{ expiresIn: '4h' }
	)

	return resSuccess(res, { token })
}

exports.getDataUserAuth = async (req, res) => {
	try {
		const user = req.user
		if (user) return resSuccess(res, req.user)
	} catch (error) {
		console.log(error)
		return resError(res, 500, 'Error al verificar usuario.')
	}
}
