const db = require( '../db' );
const errorNormaliser = require( '../errors/errorNormaliser' );

//  normalise validation error 
//
//  The idea is to allow the response handler an easy way to identify if it 
//  is a validation error ( client problem of 400 ) or an internal server
//  server error ( not client problem 500 )
//
//  basically if it is nt a client error then class it as an 
//  internal serve error.

// http://thecodebarbarian.com/mongoose-error-handling.html
// http://stackoverflow.com/questions/15012250/handling-mongoose-validation-errors-where-and-how
// https://www.mongodb.com/blog/post/the-mean-stack-mistakes-youre-probably-making
// http://stackoverflow.com/questions/783818/how-do-i-create-a-custom-error-in-javascript

var normaliseErrors = ( error, doc, next ) => {

    var normalisedError
          = errorNormaliser
              .normalise( error );
    
    next( normalisedError );
}

var runValidators = function ( next ) {

    if ( this.options ) {
        this.options.runValidators = true;
    }
    next();
    
} 

module.exports = {

    build( modelName, schema ) {

        schema.pre( 'save', runValidators );
        schema.pre( 'update', runValidators );
        schema.pre( 'findOneAndUpdate', runValidators );
        schema.pre( 'insertMany', runValidators );

        //   create is wrapper over save so errors will
        //   be caught in the save handler.
        //
        //   http://thecodebarbarian.com/mongoose-error-handling.html
        schema.post( 'save', normaliseErrors );
        schema.post( 'update', normaliseErrors );
        schema.post( 'findOneAndUpdate', normaliseErrors );
        schema.post( 'insertMany', normaliseErrors );

        return db.model( modelName, schema );
    }
};
