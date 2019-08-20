import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
	parentLocationId: {
		type: String,
		max: 255,
	},
	locationName: {
		type: String,
		required: true,
		unique: true,
	},
	male: {
		type: Number,
		required: true,
	},
	female: {
		type: Number,
		required: true,
	},
	total: {
		type: Number,
	}
});

const Location = mongoose.model("Location", locationSchema);

export default Location;
