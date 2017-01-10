const express = require( 'express' );
const router = express.Router();
const Card = require( '../data/card' );
const logger = require( '../logger' );
const response = require( './response' );
// Resource: /v1/cards

router.get( '/', ( req, res ) => {
    logger.logRequestInfo( req, 'Started' );

    Card
      .find()
      .then( allCards => response.success( req, res, allCards ) )
      .catch( error => response.error( req, res, error.message ) );
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

    // todo: distinguish be server and client errors, this can be done via promises or monads
    card
      .save()
      .then( newCard => response.created( req, res, newCard, "" ) )
      .catch( error => response.error( req, res, error.message ) );

})

module.exports = router;