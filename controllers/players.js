// create router
const router = require('express').Router();

// import models
const db = require('../models');

// GET /players
router.get('/', (req, res) => {
	// get all the players
	db.Player.find()
		.then(foundPlayers => {
			console.log(foundPlayers);
			res.send(foundPlayers);
		})
		.catch(err => {
			console.log(err);
			// 503 - service unavailable
			res.status(503).send({ message: 'Database disappointment?' });
		});
	// res.send('You have reached the GET /players route.');
});

// GET /players/:id
router.get('/:id', (req, res) => {
	db.Player.findById(req.params.id)
		.then(foundPlayer => {
			if (foundPlayer) {
				res.send(foundPlayer);
			} else {
				res.status(404).send({ message: 'Resource not located.' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(503).send({ message: 'Service Unavailable' });
		});
	// res.send('You have reached the GET /players/:id route.');
});

// POST /players
router.post('/', (req, res) => {
	db.Player.create(req.body)
		.then(createdPlayer => {
			res.status(201).send(createdPlayer);
		})
		.catch(err => {
			console.log('Error while creating new player', err);
			if (err.name === 'Validation Error') {
				res.status(406).send({ message: 'Validation Error' });
			} else {
				res.status(503).send({ message: 'Database or server error!' });
			}
		});
	// res.send('You have reached the POST /players route.');
});

// PUT /players/:id
router.put('/:id', (req, res) => {
	db.Player.findOneAndUpdate(
		{
			_id: req.params.id,
		},
		req.body,
		{
			new: true,
		}
	)
		.then(updatedPlayer => {
			res.send(updatedPlayer);
		})
		.catch(err => {
			console.log(err);
			res.status(503).send({ message: 'Server Error' });
		});
	// res.send('You have reached the PUT /players/:id route.');
});

// DELETE /players
router.delete('/', (req, res) => {
	db.Player.deleteMany()
		.then(() => {
			res.status(204).send({ message: 'They are all purged!!!' });
		})
		.catch(err => {
			console.log(err);
			res.status(503).send({ message: 'Server Error' });
		});
});

// DELETE /players/:id
router.delete('/:id', (req, res) => {
	db.Player.findByIdAndDelete(req.params.id)
		.then(() => {
			res.status(204).send();
		})
		.catch(err => {
			console.log(err);
			res.status(503).send({ message: 'Server Error' });
		});
	// res.send('You have reached the DELETE /players/:id route.');
});

// export these routes so they can be used  in index.js
module.exports = router;
