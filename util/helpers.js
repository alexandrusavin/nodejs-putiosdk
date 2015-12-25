'use strict';

const _ = require('lodash');

function makeArrayLoop() {
    const args = [];
    for (let i = 0, l = arguments.length; i < l; i++) {
        args.push(arguments[i]);
    }
    return args;
}

function asyncRequest(generatorFunc) {

    if (typeof generatorFunc !== "function") {
        throw new TypeError("Argument not generator function!");
    }

    return function() {
        const args = makeArrayLoop.apply(null, arguments);
        const generator = generatorFunc.apply(this, args);

        return (function iter(val) {
            let result;

            try {
                result = generator.next(val);

                if(!result.done) {
                    if(result.value.passThrough === true) {
                        return iter(result.value);
                    }
                    result.value.on('response', function(incomingMessage) {
                        let data = _.pick(incomingMessage,
                            ['statusCode', 'statusMessage']);
                        data.body = '';

                        incomingMessage.on('data', function(chunk) {
                            data.body += chunk.toString();
                        }).on('end', function() {
                            try {
                                data.body = JSON.parse(data.body);
                            } catch(e) {
                                // if not json string than just return it as it is
                            }

                            iter(data);
                        });
                    });
                }
            } catch (e) {
                generator.throw(e);
            }

            return result.value;
        })();
    };
}

module.exports = {
    makeArrayLoop: makeArrayLoop,
    asyncRequest: asyncRequest
};
