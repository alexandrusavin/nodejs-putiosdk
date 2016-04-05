'use strict';

const chai = require('chai');
const expect = chai.expect;

const Client = require('../../lib/Client');
const putioClient = new Client('ECGUYX6W');

describe('directory listing', () => {

    it('should return all files', (done) => {
        putioClient.file.list({parent_id: 285681349}, (err, results) => {
            expect(err).to.not.exist;
            expect(results.files).to.be.an('array');
            done();
        });
    });

    it('should return all events', (done) => {
        putioClient.file.events((err, results) => {
            expect(err).to.not.exist;
            expect(results.events).to.be.an('array');
            done();
        });
    });


});
