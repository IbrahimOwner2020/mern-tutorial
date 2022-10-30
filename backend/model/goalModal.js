const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			requird: true,
			ref: "User",
		},
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
