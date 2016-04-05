'use strict';

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;

const mockRequest = require('./fixtures/mocks').mock;

const Client = require('../../index');
const filesListFixture = require('./fixtures/filesList.json');
const eventsFixture = require('./fixtures/events.json');

describe('File list', () => {

    beforeEach(() => {
        mockRequest.file.list(200, filesListFixture, {parent_id: 123456});
        mockRequest.getDummy(200, {});
        
        mockRequest.file.events(200, eventsFixture);

        this.client = new Client('token');
        this.expectedFileListCallResult = filesListFixture;
        this.expectedEventsCallResult = eventsFixture;
    });

    it('should load file list', () => {
        const result = this.client.file.list({parent_id: 123456});
        return expect(result).to.eventually.deep.equal(this.expectedFileListCallResult);
    });
    
    it('should return a promise if no callback passed', () => {
        const result = this.client.file.events();
        return expect(result).to.eventually.deep.equal(this.expectedEventsCallResult);
    });
});
