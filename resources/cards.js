const express = require( 'express' );
const router = express.Router();
const addCardService = require( '../services/add-card-service' );
const cardsOwnedByUserQuery = require( '../services/cards-owned-by-user-query' );
const logger = require( '../logger' );
const response = require( './response' );
// Resource: /v1/cards

var createCardsDto = ( card ) => {

  return {
    id: card._id,
    title: card.title,
    description: card.description,
    url: card.url,
    dateAdded: card.dateAdded
  }

}

router.get( '/', ( req, res ) => {

    logger.logRequestInfo( req, 'Started' );

    // todo: move getting the id from the request to the middleware
    let request
          = { 
              userId: req.user.id 
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
              userId: req.user.id,
              cardDetails : {
                title: req.body.title,
                url: req.body.url,
                description: req.body.description
              }
            };


    addCardService
      .addCard( request )
      .then( newCard => createCardsDto( newCard ) )
      .then( newCard => response.created( req, res, newCard, `/v1/card/${newCard.id}` ) )
      .catch( error => response.error( req, res, error ) );

})

module.exports = router;