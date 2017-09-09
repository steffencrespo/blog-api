const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const {app, runServer, closeServer} = require('../server');

describe('blog posts', function(){

	before(function() {
		return runServer();
	});

	after(function() {
		return closeServer();
	});

	it('should retrieve the existing posts on get request', function(){
		return chai.request(app)
				.get('/blog-posts')
				.then(function(res) {
					res.should.have.status(200);
				});
	});

	it('should create a new post', function() {
		let newPost = {'title':'test post', 'content': 'dummy content', 'author': 'test bot', 'publishDate': 'today'};
		return chai.request(app)
				.post('/blog-posts')
				.send(newPost)
				.then(function(res){
					res.should.have.status(201);
					res.body.should.include.keys('title', 'content', 'author', 'publishDate');
					res.body.should.deep.equal({'id': res.body.id, 'title':'test post', 'content': 'dummy content', 'author': 'test bot', 'publishDate': 'today'})
				});
	});

	it('should modify an existing post', function() {
		let modifyPost = {'title':'test post', 'content': 'dummy content', 'author': 'test bot', 'publishDate': 'today'};

		return chai.request(app)
				.get('/blog-posts')
				.then(function(res){
					modifyPost.id = res.body[0].id;
					return chai.request(app)
						.put(`/blog-posts/${modifyPost.id}`)
						.send(modifyPost)
						.then(function(res){
							res.should.have.status(200);
							res.body.should.deep.equal(modifyPost);
						});
				})
	});

	it('should delete a post', function() {

	})
});