'use strict';

const expect = require('chai').expect;

const mockRequest = require('./fixtures/mocks').mock;

const Client = require('../../index');

describe('Generic tests', () => {

    context('successful request', () => {
        beforeEach(() => {
            mockRequest.getDummy(200, {});

            this.client = new Client('token');
        });

        const getARequest = (path) => {
            return this.client.request(path, {}, 'get', true);
        };

        it('should set Accept header to application/json', () => {
            const req = getARequest('/dummy');
            expect(req.headers.Accept).to.equal('application/json');
        });

        it('should set the oauth token to all requests', () => {
            const req = getARequest('/dummy');
            expect(req.url.query).to.equal('oauth_token=token');
        });

        ['/dummy', '/dummy/', 'dummy'].forEach((url) => {
            it(`should normalize the url when value is '${url}'`, () => {
                const req = getARequest(url);
                expect(req.url.pathname).to.equal('/v2/dummy');
            });
        });
    });

    context('error', () => {

        context('when no token supplied', () => {
            beforeEach(() => {
                mockRequest.getDummy(200, {});
            });

            it('should throw error', () => {
                expect(() => {new Client();}).to.throw('No OAUTH_TOKEN supplied');
            });

        });

    });

});
