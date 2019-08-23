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
