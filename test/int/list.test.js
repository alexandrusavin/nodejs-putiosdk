'use strict';

const chai = require('chai');
const expect = chai.expect;
const tmp = require('tmp');
const fs = require('fs');

const Client = require('../../lib/Client');
const putioClient = new Client('ECGUYX6W');

describe('directory listing', function() {
    this.timeout(5000);


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

    it('should download a file', (done) => {
        tmp.file({prefix: 'putio-int-', postfix: '.pdf', keep: true}, (err, path, fd, cleanupCallback) => {
            if(err) {
                return done(err);
            }

            const write = putioClient.file.download({file_id: 395101035})
                .pipe(fs.createWriteStream(path));

            write.on('finish', done);
        });
    });

});
