// import mongoose
const mongoose = require('mongoose');

// Creae player Schema
let playerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 100,
	},
	rank: {
		type: String,
		required: true,
	},
	gosu: {
		type: Boolean,
		default: false,
	},
	gamesPlayed: Number,
	race: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Race',
	},
});

// Export the model
module.exports = mongoose.model('Player', playerSchema);
