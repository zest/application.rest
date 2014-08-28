'use strict';
var express = require('express'),
    specifications = require('base.specifications'),
    logger = require('base.logger')('components/application/embodier'),
// create the application
    app = express();
module.exports = specifications.components.ApplicationProvider.extend(
    /**
     * @lends components/application-embodier.prototype
     */
    {
        /**
         * @classDesc embodier is an application that is used to create and manage other applications built on top of 
         * soul
         * @exports components/application-embodier
         * @extends components/ApplicationProvider
         * @constructor
         * @abstract
         */
        init: function (settings, resolver) {
            logger.info('adding 404 error handlers...');
            app.use(function (req, res, next) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            });
            // enable long stack support for q. This option enables you can see the function that triggered the async 
            // operation in the stack trace! This is very helpful for debugging, as otherwise you end up getting only
            // the first line, plus a bunch of Q internals, with no sign of where the operation started.
            require('q').longStackSupport = true;
        },
        run: function () {
            logger.info('starting the embodier server');
            // we start the server here listening to the port specified in config
            var httpServer = require('http').createServer(app).listen(3000);
            httpServer.on('listening', function () {
                logger.info('the application is now self aware on http port: ' + httpServer.address().port);
            });
        },
        serialize: specifications.base.Class.abstract,
        deserialize: specifications.base.Class.abstract
    }
);
