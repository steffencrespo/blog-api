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

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;