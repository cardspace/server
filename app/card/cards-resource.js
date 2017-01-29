const addCardCommand = require( './add-card-command' );
const cardsOwnedByUserQuery = require( './cards-owned-by-user-query' );
const cors = require( 'cors' );
const express = require( 'express' );
const logger = require( '../../services/logger' );
const requestUser = require( '../../services/security/request-user' );
const response = require( '../../services/response' );
const router = express.Router();
// Resource: /v1/cards

var createCardsDto = ( card ) => {

  return {
    id: card._id,
    title: card.title,
    text: card.text,
    dateAdded: card.dateAdded
  }

}

router.options( '/', cors() );

router.get( '/', ( req, res ) => {

    logger.logRequestInfo( req, 'Started' );

    // todo: move getting the id from the request to the middleware
    let request
          = { 
              userId: requestUser.getUserId( req ) 
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
              }
            };


    addCardCommand
      .addCard( request )
      .then( newCard => createCardsDto( newCard ) )
      .then( newCard => response.created( req, res, newCard, `/v1/card/${newCard.id}` ) )
      .catch( error => response.error( req, res, error ) );

})

module.exports = router;