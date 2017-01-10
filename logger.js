const winston = require( 'winston' );

winston.emitErrs = true;

/* loggin levels

    https://github.com/winstonjs/winston

    Each level is given a specific integer priority. The higher the priority 
    the more important the message is considered to be, and the lower the 
    corresponding integer priority. For example, npm logging levels are 
    prioritized from 0 to 5 (highest to lowest):

    { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

    setting the leve tells winston to log all messages up to
    that priority.

    e.g.

    "level: 'info'" tells the transport to log error, warn, info messages
*/
var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './log/all-logs.log',
            handleException: true,
            json: true,
            maxsize: 5242880, // 5MB
            maxFile: 5,
            colorize: false,
            timestamp: true
        }),
        new winston.transports.Console({
            level: 'debug',
            timestamp: true,
            handleExceptions: true,
            json: false,
            colorize: true 
        })
    ],
    exitOnError: false
});

logger.logRequestInfo = ( req, message ) => {
   logger.info( `[${req.id}] ${req.method} ${req.originalUrl} - ${message}` );
}

logger.logRequestError = ( req, message ) => {
    logger.error( `[${req.id}] ${req.method} ${req.originalUrl} - Error, ${message}` );
}

module.exports = logger;
module.exports.stream = {
    write: ( message, encoding ) => {
        logger.info( message );
    }
}