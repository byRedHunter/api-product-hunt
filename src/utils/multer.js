const multer = require('multer')
const path = require('path')

// configuracion de multer para aceptar solo imagenes
exports.multerImage = multer({
	storage: multer.diskStorage({}),
	fileFilter: (req, file, cb) => {
		// obtenemos la extension del archivo
		let extention = path.extname(file.originalname)

		if (
			extention !== '.jpg' &&
			extention !== '.jpeg.' &&
			extention !== '.png'
		) {
			req.fileValidator = 'No se permite este tipo de archivos.'
			return cb(null, false, new Error('No se permite este tipo de archivos.'))
		}

		return cb(null, true)
	},
})
