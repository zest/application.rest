'use strict';
var express = require('express'),
    specifications = require('base.specifications'),
    logger = require('base.logger')('components/application/embodier'),
// create the application
    app = express();
module.exports = specifications.components.ApplicationProvider.extend(
    /**
     * @lends components/application-rest.prototype
     */
    {
        /**
         * @classDesc embodier is an application that is used to create and manage other applications built on top of
         * soul
         * @exports components/application-rest
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
            // save the settings as a process variable for later use
            process.SOUL_APPLICATION_EMBODIER = settings;
            // enable long stack support for q. This option enables you can see the function that triggered the async 
            // operation in the stack trace! This is very helpful for debugging, as otherwise you end up getting only
            // the first line, plus a bunch of Q internals, with no sign of where the operation started.
            require('q').longStackSupport = true;
        },
        run: function () {
            var httpServer, httpsServer;
            logger.info('starting the embodier server');
            // we start the server here listening to the port specified in config
            if (process.SOUL_APPLICATION_EMBODIER['http-port']) {
                httpServer = require('http').createServer(app).listen(
                    process.SOUL_APPLICATION_EMBODIER['http-port']
                );
                httpServer.on('listening', function () {
                    logger.info('server listening to http port: ' + httpServer.address().port);
                });
            }
            if (process.SOUL_APPLICATION_EMBODIER['https-port']) {
                httpsServer = require('https').createServer(app).listen(
                    process.SOUL_APPLICATION_EMBODIER['https-port']
                );
                httpsServer.on('listening', function () {
                    logger.info('server listening to https port: ' + httpsServer.address().port);
                });
            }
        },
        serialize: specifications.base.Class.abstract,
        deserialize: specifications.base.Class.abstract
    }
);
