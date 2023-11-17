var axios = require('axios');
var expect = require('chai').expect;

describe('GET - /api/typesoeuvres', function () {
    it('should return a list of types d\'oeuvre or a not found message', async function () {
        return axios.get('http://localhost:3000/api/typesoeuvres')
            .then(function (response) {
                console.log(response.data);
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an('array');
            })
            .catch(function (error) {
                expect(error.response.status).to.equal(404);
            });
    });
});

describe('POST - /api/typesoeuvres', function () {
    it('should create a type d\'oeuvre', async function () {
        return axios.post('http://localhost:3000/api/typesoeuvres', {
            nom: 'Test'
        })
            .then(function (response) {
                expect(response.status).to.equal(201);
                expect(response.data).to.be.an('object');
                expect(response.data).to.have.property('nom');
                expect(response.data.nom).to.equal('Test');
            })
            .catch(function (error) {
                expect(error.response.status).to.equal(400);
            });
    });
});
