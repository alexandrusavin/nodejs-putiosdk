'use strict';

const _ = require('lodash');

const Router = require('named-routes');
const router = new Router();
const Promise = require('bluebird');
const getStream = require('get-stream');

const asyncRequest = require('../util/helpers').asyncRequest;
const routes = require('../util/routes');

/**
 * Create a File resource
 * @param {Client} client
 * @returns {File}
 * @constructor
 */
function File(client) {
    this.client = client;
}

module.exports = File;

const hydrate = (accumulator, route) => {
    router.add(route.method.toLowerCase(), route.route, _.noop, {name: route.name});

    accumulator[route.name] = {
        writable: false,
        value: asyncRequest(function *() {
            const cb = arguments[arguments.length - 1];

            const method = route.method.toLowerCase();
            const params = _.pick(arguments[0] || {}, route.params);
            const qs = _.pick(arguments[0] || {}, route.queryString);
            const requestConfig = _.extend({}, arguments[1], {
                form: params,
                qs
            });

            try {
                const apiPath = router.build(route.name, arguments[0]);

                if(!_.isEmpty(route.returns) && typeof cb !== 'function') {
                    return new Promise((resolve, reject) => {
                        const request = this.client.request(apiPath, requestConfig, method, true);

                        request
                            .on('response', incomingMessage => {
                                const response = getStream(incomingMessage);
                                response.then(
                                    result => resolve(JSON.parse(result)),
                                    err => reject(err)
                                );
                            })
                            .on('error', err => reject(err));
                    });
                }

                const results = yield this.client.request(apiPath, requestConfig, method, _.isEmpty(route.returns));

                // we expect and json object and we pick only the properties we expect
                if(route.returns && !_.isEmpty(route.returns)) {
                    return cb(null, _.pick(results.body, route.returns));
                }

                // we got a Request object so we forward it to be piped
                if(results.constructor.name === 'Request') {
                    return results;
                }

                return cb(null, results.body);
            } catch (e) {
                if(_.isFunction(cb)) {
                    return cb(e);
                }
                return Promise.reject(e);
            }
        })
    };

    return accumulator;
};

// Hydrate File object with methods based on api endpoints
const props = _.reduce(routes, hydrate, {});

Object.defineProperties(File.prototype, props);
