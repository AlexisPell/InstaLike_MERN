const asyncHandler = require('./../middleware/async')
const ErrorResponse = require('./../utils/errorResponse')
const { check, validationResult } = require('express-validator')

const User = require('./../models/User')
const ErrorResponce = require('./../utils/errorResponse')

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register =
	([
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please, include a valid email').isEmail(),
		check(
			'password',
			'Please, enter a password with 6 or more characters'
		).isLength({
			min: 6,
		}),
	],
	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { name, email, password } = req.body

		const user = await User.create({ name, email, password })

		sendTokenResponce(user, 200, res)
	}))

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body

	if (!email || !password) {
		return next(new ErrorResponce('Oops... You forgot loggin data :p', 400))
	}

	const user = await User.findOne({ email }).select('+password')

	if (!user) {
		return next(
			new ErrorResponce('Invalid credentials... try with another data', 401)
		)
	}

	const passwordMatched = await user.matchPassword(password)

	if (!passwordMatched) {
		return next(
			new ErrorResponce('Invalid credentials... try with another data', 401)
		)
	}

	sendTokenResponce(user, 200, res)
})

// @desc    Get me
// @route   POST /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id)

	res.status(200).json(user)
})

// Helper-function of sending a cookie with a token in it
// Get token from model, create coodie and send res.cookies
const sendTokenResponce = (user, statusCode, res) => {
	// Create token
	const token = user.getSignedWithJwtToken()

	const options = {
		// 30 days
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		// Turn on if no access from front is going on for protection from xss
		// httpOnly: true,
	}

	if (process.env.NODE_ENV === 'production') {
		options.secure = true
	}

	// Key(name of cookie), token, options
	res
		.status(statusCode)
		.cookie('token', token, options)
		.json({ success: true, token })
}
