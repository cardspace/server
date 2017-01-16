const express = require( 'express' );
const router = express.Router();

router.use( '/v1/cards', require( './cards' ) );
router.use( '/v1/card', require( './card' ) );

router.get( '/', ( req, res ) => {
  res.send( 'cardspace-api' );  
});

router.get( '/version', ( req, res ) => {
  res.send( '0.1.0' );
});

module.exports = router;
