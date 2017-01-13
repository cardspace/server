const db = require( '../data/db' );
const errorNormaliser = require( '../data/errorNormaliser' );
const mongoose = require( 'mongoose' );

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    dateAdded: { type: Date, required: true }
});


//  normalise validation error 
//
//  The idea is to allow the response handler an easy way to identify if it 
//  is a validation error validation error ( client problem of 400 ) 
//  or an internal server error ( not client problem 500 )
//
//  basically if it is nt a client error then class it as an 
//  internal serve error.

var normaliseErrors = ( error, doc, next ) => {

    var normalisedError
          = errorNormaliser
              .normalise( error );
    
    next( normalisedError );
}

//   create is wrapper over save so errors will
//   be caught in the save handler.
//
//   http://thecodebarbarian.com/mongoose-error-handling.html
 

userSchema.post( 'save', normaliseErrors );
userSchema.post( 'update', normaliseErrors );
userSchema.post( 'findOneAndUpdate', normaliseErrors );
userSchema.post( 'insertMany', normaliseErrors );

const User = db.model( 'User', userSchema );

User.findByEmail = ( email ) => {

    return User.findOne(  { 'email' : email.toLowerCase() } );
}

User.createNormalisedUser = ( email ) => {

    console.log( 'User.createNormalisedUser' );

    let user 
          = new User({
              email: email.toLowerCase(),
              dateAdded: Date.now()
            });
 
    return user
            .save();
            
}

module.exports = User;
