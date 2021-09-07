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

exports.getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({}).sort({ created: -1 }).populate({
			path: 'author',
		})

		return resSuccess(res, products)
	} catch (error) {
		console.log(error)
		return resError(res, 500, 'Error al obtener los productos.')
	}
}

exports.getProductById = async (req, res) => {
	// mostrar el id
	const { id } = req.params

	try {
		const product = await Product.findById(id).populate({ path: 'author' })

		return resSuccess(res, product)
	} catch (error) {
		console.log(error)
		return resError(res, 500, 'Error al obtener datos del producto.')
	}
}

exports.deleteProduct = async (req, res) => {
	// mostrar el id
	const { id } = req.params

	try {
		// obtenemos el producto
		const product = await Product.findById(id)
		// eliminamos en cloudinary
		await cloudinary.uploader.destroy(product.cloudinaryId)
		// eliminamos en la db
		await product.remove()

		return resSuccess(res, { message: 'Producto eliminado.' })
	} catch (error) {
		console.log(error)
		return resError(res, 500, 'Error al eliminar el producto.')
	}
}

exports.voteProduct = async (req, res) => {}
exports.commentProduct = async (req, res) => {}
