const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
	const allMessages = await Message.find();
	res.render("index", {
		title: "Home",
		messages: allMessages,
	});
});

exports.get_form = (req, res) => {
	res.render("form", {
		title: "Create Message",
	});
};

exports.post_form = [
	body("username")
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage("Enter a username"),
	body("message")
		.trim()
		.isLength({ min: 1, max: 100 })
		.escape()
		.withMessage("Enter a message"),
	asyncHandler(async (req, res) => {
		const errors = validationResult(req);
		const message = new Message({
			username: req.body.username,
			text: req.body.message,
		});

		if (!errors.isEmpty()) {
			res.render("form", {
				title: "Create New Message",
				message: message,
				errors: errors.array(),
			});
		} else {
			await message.save();
			res.redirect("/");
		}
	}),
];
