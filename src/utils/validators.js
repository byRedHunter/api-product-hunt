const { check, validationResult } = require('express-validator')
const { resValidator } = require('./response')

// verificar si express-validator atrapa errores de validación
exports.verifyValidator = (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) return resValidator(res, { errors: errors.array() })
}

// validar compos para el registro de usuario
exports.checkCreateUser = [
	check('name', 'El nombre es obligatorio.').not().isEmpty(),
	check('email', 'No es un correo válido').isEmail(),
	check(
		'password',
		'La contraseña debe de tener mínimo 8 caracteres.'
	).isLength({ min: 8 }),
]

// verificar campos para el login
exports.checkLoginUser = [
	check('email', 'No es un correo válido').isEmail(),
	check('password', 'Ingrese su contraseña por favor.').not().isEmpty(),
]
