'use strict';

const nock = require('nock');
const _ = require('lodash');
const Router = require('named-routes');

const router = new Router();
const BASE_URL = 'https://api.put.io/v2/';
const putioApi = nock(BASE_URL);
const routes = require('../../../util/routes');

const mock = {
    getDummy: (statusCode, body) => {
        putioApi.get('/dummy')
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
    mock.file[route.name] = (statusCode, body, params) => {
        router.add(route.method.toLowerCase(), route.route, _.noop, {name: route.name});
        const apiPath = router.build(route.name, params);

        putioApi[route.method.toLowerCase()](apiPath)
            .query(true)
            .reply(statusCode, body);


    };
});

module.exports = {
    mock: mock
};