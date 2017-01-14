const cardQuery = require( '../services/card-query' ); 
const deleteCardService = require( '../services/delete-card-service' );
const express = require( 'express' );
const logger = require( '../logger' );
const requestUser = require( '../security/request-user' );
const response = require( './response' );
const router = express.Router();
const updateCardService = require( '../services/update-card-service' );
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

    let request
          = {
              userId : requestUser.getUserId( req ),
              queryParams: {
                cardId: req.params.id
              } 
            }

    cardQuery
      .getCard( request )
      .then( card => card ? createCardDto( card ) : card )
      .then( card => response.successOrNotFound( req, res, card ) )
      .catch( error => response.invalidIdOrError( req, res, error ) );

});

router.put( '/:id', ( req, res ) => {
  logger.logRequestInfo( req, 'Started' );

  const request
         = {
             userId : requestUser.getUserId( req ),
             commandParams: {
               cardId: req.params.id,
               update: {
                  title: req.body.title, 
                  description: req.body.description, 
                  url: req.body.url,
                }
             } 
           }

  updateCardService
    .updateCard( request )
    .then( card => card ? createCardDto( card ) : card )
    .then( card => response.successOrNotFound( req, res, card ) )    
    .catch( error => response.invalidIdOrError( req, res, error ) );

});

router.delete( '/:id', ( req, res ) => {
    logger.logRequestInfo( req, 'Started' );
    
    const request
            = {
                userId : requestUser.getUserId( req ),
                commandParams:{
                  cardId: req.params.id
                }
              };

    deleteCardService
      .deleteCard( request )
      .then( card => card ? createCardDto( card ) : card )
      .then( card => response.successOrNotFound( req, res, card ) )
      .catch( error => response.invalidIdOrError( req, res, error ) );

});

module.exports = router;