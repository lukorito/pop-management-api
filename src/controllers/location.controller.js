import mongoose from "mongoose";
import Location from "../models/Location";

export const createLocation = async (req, res, next) => {
	const { locationName, male, female, parentId = null } = req.body;
	const total = Number(male) + Number(female);
	const isLocation = await Location.find({ locationName });
	if (!isLocation.length) {
		let location = new Location({
			locationName,
			male,
			female,
			parentLocationId: parentId,
			total,
		});
		try {
			await location.save();
			res.status(201).json({ message: "Location created" });
		} catch (e) {
			res.status(400).json({ message: "An error occurred" });
		}
	} else {
		console.log(isLocation)
		res.status(400).json({ message: "Location exists" });
	}
};

export const getAll = async (req, res, next) => {
	const locations = await Location.find();
	return locations.length
		? res.status(200).json({ locations })
		: res.status(404).json({ message: "No locations stored" });
};

export const getOne = async (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({ message: "Invalid location id" });
	} else {
		const location = await Location.findById(req.params.id);
		return location
			? res.status(200).json({ location })
			: res.status(400).json({ message: "No location found" });
	}
};

export const updateLocation = async (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({ message: "Invalid location id" });
	} else {
		const location = await Location.findById(req.params.id);
		if (location) {
			if (location._id === req.body.parentId) {
				res.status(400).json({
					message: "Cannot set parentId to current location",
				});
			} else {
				location.male = req.body.male || location.male;
				location.female = req.body.female || location.female;
				location.parentId = req.body.parentId || location.parentId;
				location.total =
					Number(req.body.male || location.male) +
					Number(req.body.female || location.female);
				await location.save();
				res.status(200).json({ message: "Location updated" });
			}
		} else {
			res.status(400).json({ message: "No location found" });
		}
	}
};

export const deleteLocation = async (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({ message: "Invalid location id" });
	} else {
		const location = await Location.findById(req.params.id);
		if (location) {
			await Location.updateMany(
				{ parentId: req.params.id },
				{ parentId: null },
			);
			await Location.deleteOne({ _id: req.params.id });
			res.status(200).json({ message: "Location deleted" });
		} else {
			res.status(400).json({ message: "No location found" });
		}
	}
};
