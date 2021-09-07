const { resError } = require('../utils/response')

exports.createProduct = async (req, res) => {
	// verificar el tipo de archivo
	if (req.fileValidator) return resError(res, 400, req.fileValidator)

	return res.json({ msg: 'vamos bien' })
}

exports.getAllProducts = async (req, res) => {}
exports.getProductById = async (req, res) => {}
exports.deleteProduct = async (req, res) => {}
exports.voteProduct = async (req, res) => {}
exports.commentProduct = async (req, res) => {}
