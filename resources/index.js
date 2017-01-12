const express = require( 'express' );
const router = express.Router();

router.use( '/v1/cards', require( './cards' )  );
router.use( '/v1/card', require( './card' ) );

router.get( '/', ( req, res ) => {
  res.send( 'cardspace' );  
})

module.exports = router;
