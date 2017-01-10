const express = require( 'express' );
const router = express.Router();
const Card = require( '../data/card' );
const logger = require( '../logger' );
const response = require( './response' );
// resource: /v1/card  get, put, delete

router.get( '/:id', ( req, res ) => {
    logger.logRequestInfo( req, 'Started' );

    // todo: turn this into a utility function

    // mongoose will throw a CastError if it is not
    // a valid error so we need 
    if ( !req.params.id.match(/^[0-9a-fA-F]{24}$/) ) {
        response.notFound( req, res );

    } else {

        Card
         .findById( req.params.id )
         .then( card => response.successOrNotFound( req, res, card ) )
         .catch( error => response.error( req, res, error.message ) );
        
    }

});

router.put( '/:id', ( req, res ) => {
    logger.logRequestInfo( req, 'Started' );

    if ( !req.params.id.match(/^[0-9a-fA-F]{24}$/) ) {
        response.notFound( req, res );

    } else {

        var update 
            = {
                title: req.body.title,
                description: req.body.description,
                url: req.body.url
                };

        Card
        .findByIdAndUpdate( req.params.id, update )
        .then( card => response.successOrNotFound( req, res, card ) )    
        .catch( error => response.error( req, res, error.message ) );
        
    }
});

router.delete( '/:id', ( req, res ) => {
    logger.logRequestInfo( req, 'Started' );

    if ( !req.params.id.match(/^[0-9a-fA-F]{24}$/) ) {
        response.notFound( req, res );

    } else {

        Card
          .findByIdAndRemove( req.params.id )
          .then( card => response.successOrNotFound( req, res, card ) )
          .catch( error => response.error( req, res, error.message ) );

    }

});

module.exports = router;