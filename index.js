const express = require('express');
const app = express();

// <<<< FORM DATA MIDDLEWARE >>>>
// ALLOWS FORM DATA TO BE PROCESSED IN TO REQ.BODY
app.use(express.urlencoded({ extended: false }));
// tells express to recognize req.body as a json object
app.use(express.json());

// include the players controller
app.use('/players', require('./controllers/players'));

app.get('/', (req, res) => {
	res.send('You have touched the home route of the sc2 server');
});

app.listen(8000, () => {
	console.log('Listening to the beats of 8000 Banelings');
});
