'use strict';

const Request = require('request').Request;
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;

const mockRequest = require('./fixtures/mocks').mock;
const nock = require('./fixtures/mocks').nock;

const Client = require('../../index');

describe('File API tests', () => {

    beforeEach(function() {
        this.client = new Client('token');
    });

    context('download', () => {
        beforeEach(function() {
            mockRequest.file.download(302, '', '/files/54321/download', {
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

    [
        {
            apiCall: 'search',
            apiPath: '/files/search/foobar/page/23',
            params: {
                query: 'foobar',
                page_no: 23
            },
            expectedCallResult: require('./fixtures/searchResponse.json')
        },
        {
            apiCall: 'list',
            apiPath: '/files/list',
            params: {
                parent_id: 123456
            },
            expectedCallResult: require('./fixtures/filesList.json')
        },
        {
            apiCall: 'sharedWith',
            apiPath: '/files/123456/shared-with',
            params: {
                file_id: 123456
            },
            expectedCallResult: require('./fixtures/searedWithResponse.json')
        },
        {
            apiCall: 'subtitles',
            apiPath: '/files/123456/subtitles',
            params: {
                file_id: 123456
            },
            expectedCallResult: require('./fixtures/subtitlesResponse.json')
        },
        {
            apiCall: 'shared',
            apiPath: '/files/shared',
            expectedCallResult: require('./fixtures/searedResponse.json')
        },
        {
            apiCall: 'events',
            apiPath: '/events/list',
            expectedCallResult: require('./fixtures/events.json')
        },
        {
            apiCall: 'get',
            apiPath: '/files/123456',
            params: {
                file_id: 123456
            },
            expectedCallResult: require('./fixtures/getFilePropertiesResponse.json')
        }
    ].forEach((testCase) => {
        context(testCase.apiCall, function() {
            beforeEach(function() {
                mockRequest.file[testCase.apiCall](200, testCase.expectedCallResult, testCase.apiPath);
            });

            it('should do a search request', function() {
                const promise = this.client.file[testCase.apiCall](testCase.params);
                return expect(promise).to.eventually.deep.equal(testCase.expectedCallResult);
            });
        });
    });
});
