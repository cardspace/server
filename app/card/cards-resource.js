const cors = require( 'cors' );
const express = require( 'express' );
const logger = require( '../../services/logger' );
const requestUser = require( '../../services/security/request-user' );
const response = require( '../../services/response' );
const router = express.Router();

const cardServices = require( './card-services' );

const addCardCommand = require( './commands/add-card-command' );

const cardsOwnedByUserQuery = require( './queries/cards-owned-by-user-query' );



// Resource: /v1/cards  - get, post 

var createCardsDto = ( card ) => {

  return {
    id: card._id,
    title: card.title,
    text: card.text,
    status: card.status,
    dateAdded: card.dateAdded
  }

}

router.options( '/', cors() );

router.get( '/', ( req, res ) => {

    logger.logRequestInfo( req, 'Started' );

    let request
          = { 
              userId: requestUser.getUserId( req ),
              queryParams: {
                  statusFilter: req.query.status
              }

            };

    cardsOwnedByUserQuery
      .getCards( request )
      .then( allCards => allCards.map( createCardsDto ) )
      .then( allCards => response.success( req, res, allCards ) )
      .catch( error => response.error( req, res, error ) )
      ;

})

router.post( '/', ( req, res ) => {
    logger.logRequestInfo( req, 'Started' );

    let request
          = {
              userId: requestUser.getUserId( req ),
              cardDetails : {
                title: req.body.title,
                text: req.body.text
              },
              factory: cardServices.factory,
              repository: cardServices.repository
            };


    addCardCommand
      .addCard( request )
      .then( newCard => createCardsDto( newCard ) )
      .then( newCard => response.created( req, res, newCard, `/v1/card/${newCard.id}` ) )
      .catch( error => response.error( req, res, error ) );

})

module.exports = router;