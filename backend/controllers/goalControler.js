const asyncHandler = require("express-async-handler");

// @desc get a goal
// @route GET /api/goal
const getGoals = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "get goals" });
});

// @desc create a goal
// @route POST /api/goal
const createGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error("Please enter a text field");
	}
	res.status(200).json({ message: "create a goal" });
});

// @desc update a goal
// @route PUT /api/goal/:id
const updateGoal = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `update goal ${req.params.id}` });
});

// @desc delete a goal
// @route DELETE /api/goal/:id
const deleteGoal = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `delete a goal ${req.params.id}` });
});

module.exports = {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
};
