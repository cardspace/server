const express = require( 'express' );
const router = express.Router();
const Card = require( '../models/card' );
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

    console.log( req.user );

    logger.logRequestInfo( req, 'Started' );

    Card
      .find()
      .then( allCards => allCards.map( createCardsDto ) )
      .then( allCards => response.success( req, res, allCards ) )
      .catch( error => response.error( req, res, error ) );
})

router.post( '/', ( req, res ) => {
    logger.logRequestInfo( req, 'Started' );

    let card 
          = new Card({
              title: req.body.title,
              url: req.body.url, // todo: check how urls should be stored i.e. should i url encoded them ?
              description: req.body.description,
              dateAdded: Date.now()
            });

    card
      .save()
      .then( newCard => createCardsDto( newCard ) )
      .then( newCard => response.created( req, res, newCard, `/v1/card/${newCard.id}` ) )
      .catch( error => response.error( req, res, error ) );

})

module.exports = router;