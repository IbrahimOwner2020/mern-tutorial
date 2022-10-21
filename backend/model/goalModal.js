const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
	{
		text: {
			type: String,
			required: [true, "Please enter the field"],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Goal", goalSchema);
