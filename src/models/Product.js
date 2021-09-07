const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
	product: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	business: {
		type: String,
		required: true,
		trim: true,
	},
	url: {
		type: String,
		required: true,
		trim: true,
	},
	image: {
		type: String,
		required: true,
		trim: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	comments: [{ type: Object }],
	hasVoted: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	votes: {
		type: Number,
		required: true,
		default: 0,
	},
	created: {
		type: Date,
		default: Date.now(),
	},
})

module.exports = mongoose.model('Product', productSchema)
