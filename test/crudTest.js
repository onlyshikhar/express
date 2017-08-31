let expect = require('chai').expect
let supertest = require('supertest')
let express = require('express')
let sinon = require('sinon')
let app = require('../app')

var model = require('../model/stu');
let server = supertest.agent('http://localhost/3000')


let modelStub = sinon.stub(model, 'find')
let modelPost = sinon.stub(model.prototype, 'save')
//let updateStub = sinon.stub(model, 'update')
//let removeStub = sinon.stub(model, 'remove')

describe('find/employee', () => {
    it('respond with json', (done) => {
        modelStub.yields(null, [{ name: "shikhar", id: "5" }])
        supertest(app)
            .get('/student/find')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) throw err;
                expect({ name: "shikhar" }).to.deep.equal({ name: res.body[0].name });
                done();
            })
    })
})

describe('POST', function() {
    before(function() {
        modelPost.yields(null, { name: "shikhar", id: "15" })
    })
    it('checking post', function(done) {
        supertest(app)
            .post('/student/insert')
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.name).to.be.equal("shikhar");
                expect(res.body.id).to.be.equal("15");
                done();
            })
    })
})


describe('put', () => {
    beforeEach(() => {
        modelPost.withArgs({ 'name': "shikhar"}, { $set: { 'name': "shikhar-2" } })
            .yields(null, {
                "ok": 1,
                "nModified": 1,
                "n": 1
            });
    })
    it('respond with json', (done) => {
        //console.log('inside put Test');
        supertest(app)
            .put('/student/shikhar')
            .send({ 'name': "shikhar-2" })
            .end((err, res) => {
                if (err) return done(err);
                else {
                    // console.log("res.body");
                    expect(res.body.ok).to.be.equal(1);
                    done();
                }
            });
    });
});


describe('delete', () => {
    before(() => {
        modelPost.withArgs({ '_id': 15 })
            .yields(null, {
                "ok": 1,
                "nModified": 1,
                "n": 1
            });
    })
    it('respond with json', (done) => {
        supertest(app)
            .delete('/student/15')
            .end((err, res) => {
                if (err) return 
                  done(err);
                
                    console.log(res.body);
                    expect(res.body.ok).to.be.equal(1);
                    done();
            });
        
    });
});