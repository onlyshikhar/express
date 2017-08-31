let assert = require("chai").assert
let supertest = require("supertest")

let app=require('../app')

var url = supertest("http://localhost:3000");

describe("testing first route", function(err) {
    it("should test multiplication", function(done) {
        url
            .post("/mul/3/4")
            .end(function(err, res) {
              if (err) throw err
                assert.equal(res.text, 12);
                done();
            });
    });
      it("should test addition", function(done) {
        url
            .post("/add/9/7")
            .end(function(err, res) {
              if (err) throw err
                assert.equal(res.text, 16);
                done();
            });
            });
           it("should test subtraction", function(done) {
        url
            .post("/sub/9/7")
            .end(function(err, res) {
              if (err) throw err
                assert.equal(res.text, 2);
                done();
            });
            });
           it("should test division", function(done) {
        url
            .post("/div/9/9")
            .end(function(err, res) {
              if (err) throw err
                assert.equal(res.text, 1);
                done();
            });
            });
});
