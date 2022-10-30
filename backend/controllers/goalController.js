const asyncHandler = require("express-async-handler");
const Goal = require("../model/goalModal");
const User = require("../model/userModal");

// @desc get a goal
// @route GET /api/goal
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({ user: req.user.id });
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
		user: req.user.id,
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

	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	if (user.id !== goal.user.toString()) {
		res.status(401);
		throw new Error("User not athorized");
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

	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	if (user.id !== goal.user.toString()) {
		res.status(401);
		throw new Error("User not athorized");
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
