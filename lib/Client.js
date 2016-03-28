'use strict';

const _ = require('lodash');
const url = require('url');
const request = require('request');

const File = require('./File');

const BASE_URL = 'https://api.put.io/v2/';
const ACCESS_TOKEN_URL = 'oauth2/access_token';
const AUTHENTICATION_URL = 'oauth2/authenticate';

/**
 * A Client of the putio api
 *
 * @param OAUTH_TOKEN
 * @returns {Client}
 * @constructor
 */
function Client(OAUTH_TOKEN) {
    if(!(this instanceof Client)) {
        return new Client(OAUTH_TOKEN);
    }

    if(!OAUTH_TOKEN) {
        throw new Error('No OAUTH_TOKEN supplied');
    }

    this.defaultParams = {
        qs: {
            oauth_token: OAUTH_TOKEN
        },
        headers: {
            'Accept': 'application/json'
        }
    };

    this.file = new File(this);
}

module.exports = Client;

/**
 * Normalize url to be used when calling the api.
 *
 * @param path
 * @return {*}
 */
Client.normaliseUrl = function(path) {
    path = _.trim(path, '/');
    return url.resolve(BASE_URL, path);
};

/**
 * Request wrapper
 *
 * @param path
 * @param params
 * @param method
 * @param passThrough
 * @return {*}
 */
Client.prototype.request = function(path, params, method, passThrough) {
    const reqParams = _.defaultsDeep(params || {}, this.defaultParams);
    reqParams.url = Client.normaliseUrl(path);

    const req = request[method.toLowerCase()](reqParams);

    req.passThrough = Boolean(passThrough);

    return req;
};
