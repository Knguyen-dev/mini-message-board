const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const messageSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
		maxLength: 100,
	},
	date_added: {
		type: Date,
		default: Date.now,
	},
});

messageSchema.virtual("formatted_date_added").get(function () {
	return DateTime.fromJSDate(this.date_added).toLocaleString(
		DateTime.DATETIME_MED
	);
});

module.exports = mongoose.model("Message", messageSchema);
