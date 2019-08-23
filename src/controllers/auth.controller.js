import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function signup(req, res, next) {
	User.findOne({ email: req.body.email }, function(err, user) {
		if (user) {
			res.status(400).json({ message: "User already exists" });
		} else {
			const passwordHash = bcrypt.hashSync(req.body.password, 10);

			let user = new User({
				username: req.body.username,
				email: req.body.email,
				password: passwordHash,
			});

			user.save(function(err) {
				if (err) {
					res.status(500).json({ message: "An error has occurred" });
				} else {
					res.status(201).json({
						message: "User successfully created",
					});
				}
			});
		}
	});
}

export async function login(req, res, next) {
	const user = await User.find({ email: req.body.email }).exec();

	if (user.length) {
		const match = await bcrypt.compare(req.body.password, user[0].password);
		if (match) {
			const token = jwt.sign(
				{
					username: user[0].username,
					email: user[0].email,
				},
				process.env.JWT_SECRET,
				{ expiresIn: "24h" },
			);
			res.status(200).json({ accessToken: token });
		} else {
			res.status(400).json({ message: "Invalid login" });
		}
	} else {
		res.status(400).json({ message: "Invalid login" });
	}
}
