const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModal");

// Generate token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

// @desc create a user
// @route POST /api/users
const registerUser = asyncHandler(async (req, res) => {
	// validates field
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please add all field");
	}

	// check if user exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	// Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			id: user.id,
			email: user.email,
			name: user.name,
			token: generateToken(user.id),
		});
	} else {
		throw new Error("Invalid user data");
	}
});

// @desc login user
// @route POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
	// validate Fields
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400);
		throw new Error("Please add all field");
	}

	// get User
	const user = await User.findOne({ email });

	// Check user and password
	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			id: user.id,
			email: user.email,
			name: user.name,
			token: generateToken(user.id),
		});
	} else {
		throw new Error("Invalid user credentials");
	}
});

// @desc login user
// @route GET /api/users/me
const getMe = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);

	res.status(200).json({
		id: user.id,
		email: user.email,
		name: user.name,
	});
});

module.exports = { registerUser, loginUser, getMe };
