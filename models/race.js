const mongoose = require('mongoose');

const raceSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	players: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Player',
		},
	],
});

module.exports = mongoose.model('Race', raceSchema);
