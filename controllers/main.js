// check username, password in post(login) request
// if exist create new JWT
// send back to front-end
// setup authentication so only the request with JWT can access the dashboard
const CustomAPIError = require('../errors/custom-error');
const JWT = require('jsonwebtoken');

const login = async (req, res) => {
	const { userName, password } = req.body;

	if (!userName || !password) {
		throw new CustomAPIError('please provided userName and password', 400);
	}

	//just for demo, normally provided by DB!!!!
	const id = new Date().getDate();

	const token = JWT.sign({ id, userName }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
	res.status(200).send({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
	const { id, userName } = req.user;
	const secretNumber = Math.floor(Math.random() * 100);
	res.status(200).json({
		msg: `hello, ${userName}`,
		secret: `here is your authorized data, your secret number is : ${secretNumber} `,
	});
};

module.exports = { login, dashboard };
