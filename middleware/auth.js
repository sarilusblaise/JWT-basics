const { UnauthenticatedError } = require('../errors');
const JWT = require('jsonwebtoken');
const authenticationMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer')) {
		throw new UnauthenticatedError('No token provided');
	}
	const token = authHeader.split(' ')[1];
	try {
		const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
		const { id, userName } = decodedToken;
		req.user = { id, userName };
		console.log(decodedToken);
		next();
	} catch (error) {
		throw new UnauthenticatedError('Not authorized to access this route');
	}
};

module.exports = authenticationMiddleware;
