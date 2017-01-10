const express = require( 'express' );
const router = express.Router();
const Card = require( '../data/card' );
const logger = require( '../logger' );
// resource: /v1/card  get, put, delete

router.get( '/:id', ( req, res ) => {
    logger.info( `[${req.id}] GET ${req.originalUrl} - Started` );

    // todo: turn this into a utility function

    // mongoose will throw a CastError if it is not
    // a valid error so we need 
    if ( !req.params.id.match(/^[0-9a-fA-F]{24}$/) ) {
        logger.info( `[${req.id}] GET ${req.originalUrl} - Not Found` );

        res.status( 404 ).send();
    }

    Card
      .findById( req.params.id )
      .then( card => {

          if ( card ) {
              logger.info( `[${req.id}] GET ${req.originalUrl} - Completed` );

              res.status( 200 ).json( card );
          
           } else {
              logger.info( `[${req.id}] GET ${req.originalUrl} - Not Found` );

              res.status( 404 ).send();
           }
       })
      .catch( error => {
          logger.info( `[${req.id}] GET ${req.originalUrl} - Error, ${error}` );

          res.status( 500 ).send( error );
      });

});

router.put( '/:id', ( req, res ) => {
    logger.info( `[${req.id}] PUT ${req.originalUrl} - Started` );

    if ( !req.params.id.match(/^[0-9a-fA-F]{24}$/) ) {
        logger.info( `[${req.id}] PUT ${req.originalUrl} - Not Found` );

        res.status( 404 ).send();

    } else {

    var update 
          = {
              title: req.body.title,
              description: req.body.description,
              url: req.body.url
            };

    Card
      .findByIdAndUpdate( req.params.id, update )
      .then( card => {

          if ( card ) {
              logger.info( `[${req.id}] PUT ${req.originalUrl} - Completed` );

              res.status( 200 ).send();
          
           } else {
               logger.info( `[${req.id}] PUT ${req.originalUrl} - Not Found` );

               res.status( 404 ).send();
           }
       })
      .catch( error => {
          logger.info( `[${req.id}] PUT ${req.originalUrl} - Error, ${error}` );

          res.status( 500 ).send( error );
      });
    }
});



router.delete( '/:id', ( req, res ) => {
    logger.info( `[${req.id}] DELETE ${req.originalUrl} - Started` );

    if ( !req.params.id.match(/^[0-9a-fA-F]{24}$/) ) {
        logger.info( `[${req.id}] DELETE ${req.originalUrl} - Not Found` );

        res.status( 404 ).send();
    }

    Card
      .findByIdAndRemove( req.params.id )
      .then( card => {

          if ( card ) {
              logger.info( `[${req.id}] DELETE ${req.originalUrl} - Completed` );

              res.status( 200 ).send();
          
           } else {
               logger.info( `[${req.id}] DELETE ${req.originalUrl} - Not Found` );

               res.status( 404 ).send();
           }
       })
      .catch( error => {
          logger.info( `[${req.id}] DELETE ${req.originalUrl} - Error, ${error}` );

          res.status( 500 ).send( error );
      });

});

module.exports = router;