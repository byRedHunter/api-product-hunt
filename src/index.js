const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

// crear el servidor
const app = express()

// conectarnos a la DB
connectDB()

// habilitar cors
app.use(cors()) // permite la conexion con otras aplicaciones

// habilitar el envio de json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// puerto para la app
const PORT = process.env.PORT || 5000

// rutas de la app
app.use('/api/user', require('./routes/user.route'))
app.use('/api/product', require('./routes/product.route'))

// levantar la app
app.listen(PORT, () => {
	console.log(`Server run on http://localhost:${PORT}`)
})
