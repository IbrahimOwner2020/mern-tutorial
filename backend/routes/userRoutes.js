const express = require("express");
const router = express.Router();
const {
	registerUser,
	getMe,
	loginUser,
} = require("../controllers/userController");
const { protect } = require('../middleware/authMIddleware')

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
