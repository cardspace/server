const express = require( 'express' );
const router = express.Router();
const Card = require( '../data/card' );
const logger = require( '../logger' );

// Resource: /v1/cards

router.get( '/', ( req, res ) => {
    logger.info( `[${req.id}] GET ${req.originalUrl} - Started` );

    Card
      .find()
      .then( allCards => {
          logger.info( `[${req.id}] GET ${req.originalUrl} - Completed` );

          res.json( allCards );
      })
      .catch( error => {
          logger.error( `[${req.id}] GET ${req.originUrl} - Error, ${error}` );

          res.status( 500 ).send( error );
      });
})

router.post( '/', ( req, res ) => {
    logger.info( `[${req.id}] POST ${req.originalUrl} - Started` );

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
      .then( newCard => {
          logger.info( `[${req.id}] POST ${req.originalUrl} - Started` );

          // todo: put the absolute url of the resource into the location header field.
          res.status( 201 ).json( newCard );
      })
      .catch( error => {
          logger.error( `[${req.id}] POST ${req.originUrl} - Error, ${error}` );

          res.status( 500 ).send( error );
      });
})

module.exports = router;