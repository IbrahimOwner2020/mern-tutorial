const asyncHandler = require("express-async-handler");
const Goal = require("../model/goalModal");

// @desc get a goal
// @route GET /api/goal
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find();
	res.status(200).json(goals);
});

// @desc create a goal
// @route POST /api/goal
const createGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error("Please enter a text field");
	}

	const goal = await Goal.create({
		text: req.body.text,
	});
	res.status(200).json(goal);
});

// @desc update a goal
// @route PUT /api/goal/:id
const updateGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error("goal not found");
	}

	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedGoal);
});

// @desc delete a goal
// @route DELETE /api/goal/:id
const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error("goal not found");
	}

	const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

	res.status(200).json({ message: `Deleted goal: ${deletedGoal.text}` });
});

module.exports = {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
};
