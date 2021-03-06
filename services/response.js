const ValidationError = require( './errors/ValidationError' );
const logger = require( './logger' );
const PermissionError = require( './errors/PermissionError' );

module.exports = {

    success( req, res, data ) {
        logger.logRequestInfo( req, 'Completed' );

        res.status( 200 ).json( data );
    },

    created( req, res, data, createdResourceUrl ) {
        logger.logRequestInfo( req, 'Completed' );

        // todo: set the header to the url of the create 
        res.status( 201 ).set('Location', createdResourceUrl ).json( data );
    },

    notFound( req, res ) {
        logger.logRequestInfo( req, 'Not Found' );

        res.status( 404 ).send()
    },

    successOrNotFound( req, res, data ) {

        if ( data ) {
            this.success( req, res, data );
        
        } else {
            this.notFound( req, res );
        }

    },

    error( req, res, error ) {
        logger.logRequestError( req, error );

        if ( error instanceof ValidationError ) {

            var publicError = {
                errors: error.errors,
                fieldErrors: error.fieldErrors
            }

            res.status( 400 ).json( publicError );

        } else if ( error instanceof PermissionError ) {

            res.status( 403 ).json( { id: req.id, errorCode: error.code, errorMessage: error.message } );

        } else {

            res.status( 500 ).json({ id : req.id, message: 'An internal error has occured, look for the id in the log.'} );
        }
    },

    invalidIdOrError( req, res, error ) {

        if ( error.name == 'CastError' ) {
            this.notFound( req, res );
        
        } else {
            this.error( req, res, error )
        }

    }
    
}


