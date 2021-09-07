const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })

const connectDB = async () => {
	try {
		const db = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		console.log(`DB is connected to ${db.connection.name}`)
	} catch (error) {
		console.log('HUBO UN ERROR: ', error)
		process.exit(1) // detiene el servidor
	}
}

module.exports = connectDB
