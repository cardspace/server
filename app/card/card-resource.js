const express = require( 'express' );
const logger = require( '../../services/logger' );
const requestUser = require( '../../services/security/request-user' );
const response = require( '../../services/response' );
const router = express.Router();

const cardServices = require( './card-services' );

const deleteCardCommand = require( './commands/delete-card-command' );
const updateCardCommand = require( './commands/update-card-command' );
const changeCardStatusCommand = require( './commands/change-card-status-command' );

const cardQuery = require( './queries/card-query' ); 


// resource: /v1/card/:id             - get, put, delete
//           /v1/card/:id/completed   - put
//           /v1/card/:id/active      - put 


var createCardDto = ( card ) => {

  return {
    id: card._id,
    title: card.title,
    text: card.text,
    status: card.status,
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
                  text: req.body.text, 
                }
             },
             repository: cardServices.repository
           }

  updateCardCommand
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
                },
                repository: cardServices.repository
              };

    deleteCardCommand
      .deleteCard( request )
      .then( card => card ? createCardDto( card ) : card )
      .then( card => response.successOrNotFound( req, res, card ) )
      .catch( error => response.invalidIdOrError( req, res, error ) );

});

router.put( '/:id/completed', ( req, res ) => {
  logger.logRequestInfo( req, 'Started' );

  const request
         = {
             userId : requestUser.getUserId( req ),
             commandParams: {
               cardId: req.params.id
             },
             repository: cardServices.repository
           }

  changeCardStatusCommand
    .markCardAsCompleted( request )
    .then( card => card ? createCardDto( card ) : card )
    .then( card => response.successOrNotFound( req, res, card ) )
    .catch( error => response.invalidIdOrError( req, res, error ) );

});

router.put( '/:id/activate', ( req, res ) => {
  logger.logRequestInfo( req, 'Started' );

  const request
         = {
             userId : requestUser.getUserId( req ),
             commandParams: {
               cardId: req.params.id
             },
             repository: cardServices.repository
           }

  changeCardStatusCommand
    .markCardAsActive( request )
    .then( card => card ? createCardDto( card ) : card )
    .then( card => response.successOrNotFound( req, res, card ) )
    .catch( error => response.invalidIdOrError( req, res, error ) );

});



module.exports = router;