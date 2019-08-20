import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
	const token = req.headers.authorization;
	if (token) {
		const accessToken = token.split(" ")[1];
		jwt.verify(accessToken, process.env.JWT_SECRET, function(err, decoded) {
			if (err) {
				res.status(401).json({
					message: "Invalid token signature",
				});
			} else {
				req.user = decoded;
				next();
			}
		});
	} else {
		res.status(401).json({
			message: "Invalid token",
		});
	}
};

export default checkToken;
