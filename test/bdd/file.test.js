'use strict';

const expect = require('chai').expect;

const mockRequest = require('./fixtures/mocks').mock;

const Client = require('../../index');


describe('File list', () => {

    beforeEach(() => {
        const fixture = require('./fixtures/filesList.json');
        mockRequest.file.list(200, fixture, {parent_id: 123456});
        mockRequest.getDummy(200, {});

        this.client = new Client('token');
        this.expectedResult = fixture.files;
    });

    it('should load file list', done => {
        this.client.file.list({parent_id: 123456}, (err, result) => {
            expect(result.files).to.deep.equal(this.expectedResult);
            done();
        });
    });
});