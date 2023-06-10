const CustomAPIError = require('../errors/custom-error');
const JWT = require('jsonwebtoken');
const authenticationMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer')) {
		throw new CustomAPIError('no token provided', 401);
	}
	const token = authHeader.split(' ')[1];
	try {
		const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
		const { id, userName } = decodedToken;
		req.user = { id, userName };
		console.log(decodedToken);
		next();
	} catch (error) {
		throw new CustomAPIError('not authorize to access this route', 401);
	}
};

module.exports = authenticationMiddleware;
