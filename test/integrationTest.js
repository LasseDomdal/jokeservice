require('should');
const request = require('supertest');
const controller = require("../controllers/controllers");
const app = require('../app.js');

describe('integration test - promise', function () {

    it("get('/') test", function () {
        return request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/);
    });

    it("get('/employee') test", async () => {
        let response = await request(app)
            .get('/employee')
            .expect(200)
            .expect('Content-Type', /json/);
        response.body.length.should.be.greaterThanOrEqual(2);
        response.body[0].name.should.be.equal('Viggo');
        response.body[1].name.should.be.equal('Ida');
    });

    it("get('/company') test", async () => {
        let response = await request(app)
            .get('/company')
            .expect(200)
            .expect('Content-Type', /json/);
        response.body.length.should.be.greaterThanOrEqual(1);
        response.body[0].name.should.be.equal('Coop');
    });

    it("post('/company') test", async () => {
        let response = await request(app)
            .post('/company')
            .send({
                'hours': 40,
                'name': 'EAAA'
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200);
        response.body.message.should.be.equal('Company saved!');
        response = await controller.getCompanies();
        response.length.should.be.greaterThanOrEqual(2);
        response[1].name.should.be.equal('EAAA');
    });
});