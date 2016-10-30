'use strict';

const nock = require('nock');
const _ = require('lodash');

const routes = require('../../../util/routes');

const BASE_URL = 'https://api.put.io/v2/';
const putioApi = nock(BASE_URL)
    .defaultReplyHeaders({
        'Content-Type': 'application/json'
    });

const mock = {
    getDummy: (statusCode, body) => {
        putioApi.get('/dummy')
            .query(true)
            .reply(statusCode, body);
    },
    getDummyWithParams: (statusCode, body) => {
        putioApi.get('/dummy/:someParam')
            .query(true)
            .reply(statusCode, body);
    },
    postDummy: (statusCode, body) => {
        putioApi.post('/dummy')
            .query(true)
            .reply(statusCode, body);
    }
};

mock.file = {};
_.map(routes, (route) => {
    mock.file[route.name] = (statusCode, body, apiPath, headers) => {
        return putioApi[route.method.toLowerCase()](apiPath)
            .query(true)
            .reply(statusCode, body, headers);
    };
});

module.exports = {
    mock,
    nock
};
