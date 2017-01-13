const express = require( 'express' );
const router = express.Router();
const Card = require( '../models/card' );
const logger = require( '../logger' );
const response = require( './response' );
// resource: /v1/card  get, put, delete

var createCardDto = ( card ) => {

  return {
    id: card._id,
    title: card.title,
    description: card.description,
    url: card.url,
    dateAdded: card.dateAdded
  }

}

router.get( '/:id', ( req, res ) => {
    logger.logRequestInfo( req, 'Started' );


    Card
      .findById( req.params.id )
      .then( card => card ? createCardDto( card ) : card )
      .then( card => response.successOrNotFound( req, res, card ) )
      .catch( error => response.invalidIdOrError( req, res, error ) );

});

router.put( '/:id', ( req, res ) => {
    logger.logRequestInfo( req, 'Started' );


    var update 
        = {
            title: req.body.title,
            description: req.body.description,
            url: req.body.url
            };

    Card
      .findByIdAndUpdate( req.params.id, update )
      .then( card => card ? createCardDto( card ) : card )
      .then( card => response.successOrNotFound( req, res, card ) )    
      .catch( error => response.invalidIdOrError( req, res, error ) );

});

router.delete( '/:id', ( req, res ) => {
    logger.logRequestInfo( req, 'Started' );


    Card
      .findByIdAndRemove( req.params.id )
      .then( card => card ? createCardDto( card ) : card )
      .then( card => response.successOrNotFound( req, res, card ) )
      .catch( error => response.invalidIdOrError( req, res, error ) );

});

module.exports = router;