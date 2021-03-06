const express = require( 'express' );
const router = express.Router();


router.use( '/v1/cards', require( './app/card/cards-resource' ) );
router.use( '/v1/card', require( './app/card/card-resource' ) );
router.use( '/v1/spaces', require( './app/space/spaces-resource' ) );
router.use( '/v1/space', require( './app/space/space-resource' ) );


router.get( '/', ( req, res ) => {
  res.send( 'cardspace-api' );  
});

router.get( '/version', ( req, res ) => {
  res.send( '0.1.0' );
});

module.exports = router;
