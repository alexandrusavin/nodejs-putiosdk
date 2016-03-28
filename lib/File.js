'use strict';

const _ = require('lodash');

const Router = require('named-routes');
const router = new Router();

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

            try {
                const apiPath = router.build(route.name, arguments[0]);
                const method = route.method.toLowerCase();
                const params = _.pick(arguments[0] || {}, route.params);

                const results = yield this.client.request(apiPath,
                    {form: params, followRedirect: false}, method, _.isEmpty(route.returns));

                // we expect and json object and we pick only the properties we expect
                if(route.returns && !_.isEmpty(route.returns)) {
                    return cb(null, _.pick(results.body, route.returns));
                }

                // we got a Request object so we forward it to be piped
                if(results.constructor.name === 'Request') {
                    return results;
                }

                cb(null, results.body);
            } catch (e) {
                cb(e);
            }
        })
    };

    return accumulator;
};

// Hydrate File object with methods based on api endpoints
const props = _.reduce(routes, hydrate, {});

Object.defineProperties(File.prototype, props);
