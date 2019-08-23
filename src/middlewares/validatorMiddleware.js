export const locationNameValidator = (req, res, next) => {
	if (req.body && "locationName" in req.body) {
		if (!/^[a-zA-Z]+$/.test(req.body.locationName.trim())) {
			res.status(400).json({ message: "Location name must be a string" });
		} else {
			next();
		}
	} else {
		res.status(400).json({ message: "Location name is required" });
	}
};

export const maleValidator = (req, res, next) => {
	if (req.body && "male" in req.body) {
		if (!/^[0-9]+$/.test(req.body.male.trim())) {
			res.status(400).json({ message: "Male must be a number" });
		} else {
			next();
		}
	} else {
		res.status(400).json({ message: "Male must be a number" });
	}
};

export const femaleValidator = (req, res, next) => {
	if (req.body && "female" in req.body) {
		if (!/^[0-9]+$/.test(req.body.female.trim())) {
			res.status(400).json({ message: "Female must be a number" });
		} else {
			next();
		}
	} else {
		res.status(400).json({ message: "Female must be a number" });
	}
};

export const emailValidator = (req, res, next) => {
	if (req.body && "email" in req.body) {
		if (!/^\S+@\S+\.\S+$/.test(req.body.email.trim())) {
			res.status(400).json({ message: "Invalid email" });
		} else {
			next();
		}
	} else {
		res.status(400).json({ message: "Email is required" });
	}
};

export const usernameValidator = (req, res, next) => {
	if (req.body && "username" in req.body) {
		if (!/\S/.test(req.body.username.trim())) {
			res.status(400).json({ message: "Invalid username" });
		} else {
			next();
		}
	} else {
		res.status(400).json({ message: "username is required" });
	}
};
