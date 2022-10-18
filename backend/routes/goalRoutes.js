const express = require("express");
const router = express.Router();
const {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
} = require("../controllers/goalControler");

router.route("/").get(getGoals).post(createGoal);
router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;
