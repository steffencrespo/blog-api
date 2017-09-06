const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create("The best Node", "This is the best node app", "Leo Steffen", "9/2/2017");
BlogPosts.create("Here and now", "Talks about wasting time", "Leo Steffen", "9/3/2017");
BlogPosts.create("Never enough", "Greed is not your friend", "Leo Steffen", "9/4/2017");

router.get('/', (req, res) => {
	res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author', 'publishDate'];

	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const error = `Missing ${field} in request body`;
			console.error(error);
			return res.status(400).send(error);
		}
	}

	const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
	return res.status(200).send(item);
});

router.put('/:id', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author', 'publishDate'];

	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const error = `Missing ${field} in request body`;
			console.error(error);
			return res.status(400).send(error);
		}
	}
	
	if(req.body.id != req.params.id) {
		const error = `Body and request id parameters do not match`;
		console.error(error);
		return res.status(400).send(error);
	}

	BlogPosts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		publishDate: req.body.publishDate
	});

	res.status(204).end();
});

router.delete('/:id', (req, res) => {

});

module.exports = router;