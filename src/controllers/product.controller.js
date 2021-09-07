const Product = require('../models/Product')
const cloudinary = require('../utils/cloudinary')
const { resError, resSuccess } = require('../utils/response')

exports.createProduct = async (req, res) => {
	// verificar el tipo de archivo
	if (req.fileValidator) return resError(res, 400, req.fileValidator)

	try {
		// subimos el archivo a cloudinary
		const resultUploadImage = await cloudinary.uploader.upload(req.file.path)

		// creamos el nuevo producto
		const product = new Product({
			...req.body,
			image: resultUploadImage.secure_url,
			cloudinaryId: resultUploadImage.public_id,
			author: req.user.id,
		})

		// guardamos en la db
		await product.save()

		return resSuccess(res, product)
	} catch (error) {
		console.log(error)
		return resError(res, 500, 'Error al crear el post.')
	}
}

exports.getAllProducts = async (req, res) => {}
exports.getProductById = async (req, res) => {}
exports.deleteProduct = async (req, res) => {}
exports.voteProduct = async (req, res) => {}
exports.commentProduct = async (req, res) => {}
