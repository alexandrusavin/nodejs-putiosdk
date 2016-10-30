'use strict';

const Request = require('request').Request;
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;

const mockRequest = require('./fixtures/mocks').mock;
const nock = require('./fixtures/mocks').nock;

const Client = require('../../index');
const filesListFixture = require('./fixtures/filesList.json');
const eventsFixture = require('./fixtures/events.json');
const searchResultsFixture = require('./fixtures/searchResponse.json');

describe('File API tests', () => {

    beforeEach(function() {
        this.client = new Client('token');
    });

    context('list', function() {
        beforeEach(function() {
            mockRequest.file.list(200, filesListFixture, {parent_id: 123456});
            mockRequest.getDummy(200, {});

            mockRequest.file.events(200, eventsFixture);

            this.expectedFileListCallResult = filesListFixture;
            this.expectedEventsCallResult = eventsFixture;
        });

        it('should load file list', function() {
            const result = this.client.file.list({parent_id: 123456});
            return expect(result).to.eventually.deep.equal(this.expectedFileListCallResult);
        });
    });

    context('events', function() {
        beforeEach(function() {
            mockRequest.file.events(200, eventsFixture);

            this.expectedEventsCallResult = eventsFixture;
        });

        it('should do an events request', function() {
            const result = this.client.file.events();
            return expect(result).to.eventually.deep.equal(this.expectedEventsCallResult);
        });
    });

    context('download', () => {
        beforeEach(function() {
            mockRequest.file.download(302, '', {file_id: 54321}, {
                Location: 'http://example.com/download'
            });

            this.followed = nock('http://example.com')
                .get('/download')
                .reply(200);
        });

        it('should return a request object', function() {
            const result = this.client.file.download({file_id: 54321});
            expect(result).to.be.an.instanceof(Request);
        });

        it('should follow redirects', function(done) {
            const result = this.client.file.download({file_id: 54321});

            result.on('response', () => {
                expect(this.followed.isDone()).to.be.true;
                done();
            });
        });

        it('should not follow redirects if not configured', function(done) {
            const result = this.client.file.download({file_id: 54321}, {followRedirect: false});

            result.on('response', () => {
                expect(this.followed.isDone()).to.be.false;
                done();
            });
        });
    });

    context('search', function() {
        beforeEach(function() {
            mockRequest.file.search(200, searchResultsFixture, {
                query: 'foobar',
                page: 23
            });

            this.expectedSearchCallResult = searchResultsFixture;
        });

        it('should do a search request', function() {
            const result = this.client.file.search({
                query: 'foobar',
                page: 23
            });
            return expect(result).to.eventually.deep.equal(this.expectedSearchCallResult);
        });
    });
});
