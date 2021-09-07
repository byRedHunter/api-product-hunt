const express = require('express')
const {
	createProduct,
	getAllProducts,
	getProductById,
	deleteProduct,
	voteProduct,
	commentProduct,
} = require('../controllers/product.controller')
const { isAuth } = require('../utils/isUserAuth')
const { multerImage } = require('../utils/multer')

const router = express.Router()

// crear nuevo producto
router.post('/', isAuth, multerImage.single('image'), createProduct)

// obtener todos los productos
router.get('/', getAllProducts)

// obtner un producto por el id
router.get('/:id', getProductById)

// eliminar un producto por el id
router.delete('/:id', isAuth, deleteProduct)

// votar un producto
router.put('/vote/:id', isAuth, voteProduct)

// commentar un producto
router.put('/comment/:id', isAuth, commentProduct)

module.exports = router
