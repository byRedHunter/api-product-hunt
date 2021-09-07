exports.resError = (res, status, message) => {
	return res.status(status).json({ message })
}

exports.resValidator = (res, data) => {
	return res.status(400).json(data)
}

exports.resSuccess = (res, data) => {
	return res.status(200).json(data)
}
