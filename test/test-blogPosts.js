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

});