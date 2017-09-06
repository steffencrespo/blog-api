const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create("The best Node", "This is the best node app", "Leo Steffen", "9/2/2017");
BlogPosts.create("Here and now", "Talks about wasting time", "Leo Steffen", "9/3/2017");
BlogPosts.create("Never enough", "Greed is not your friend", "Leo Steffen", "9/4/2017");

router.get('/', (req, res) => {
	res.status(200).json(BlogPosts.get());
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

	if (item) {
		return res.status(201).json(item);	
	} else {
		return res.status(500).send("Internal server error");
	}

	
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

	const item = BlogPosts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		publishDate: req.body.publishDate
	});
	console.log(`Updated blog post \`${req.params.id}\``);

	if (item) {
		res.status(200).json(item);	
	} else {
		res.status(500).send("Internal Server Error");
	}
	
});

router.delete('/:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`Deleted blog post \`${req.params.id}\``);
	res.status(204).end();
});

module.exports = router;