const express = require('express');
const app = express();

const morgan = require('morgan');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const blogPostsRouter = require('./blogPostsRouter');

app.use(morgan('common'));

app.use('/blog-posts', blogPostsRouter);

app.listen(process.env.PORT || 8080, () => {
	console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});