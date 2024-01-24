const mongoose = require("mongoose");

async function connectToDb() {
	await mongoose.connect(process.env.uri);
}

module.exports = { connectToDb };
