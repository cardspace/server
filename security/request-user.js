const ValidationError = require( '../errors/ValidationError' );
const errors = require( '../data/errors' );
const Promise = require( 'bluebird' );
const response = require( '../resources/response' );
const User = require( '../models/user' );


var getUserEmailFromRequest = ( req ) => {

  return Promise.try( () => {

    if ( !( req.user.email ) ) {
      throw new ValidationError( [ errors.emailMissingFromRequest ], {}, {} );
    }  
    return req.user.email;
  });
}

var getOrCreateUser = ( userEmail ) => {

  // This will turn into a service as 
  // there will be alot of stuff
  return User
           .findByEmail( userEmail )
           .exec()
           .then( user => !user ? User.createNormalisedUser( userEmail ) : user )
           ;
}


var updateRequesWithUserId = ( req, user ) => {

  req.user.id = user.id;
  return user;
}


var addUserIdToRequest = ( req, res, next ) => {

  // get the user details based on the email
  // assign the user id to the request
  // call the next element in the pipeline
  getUserEmailFromRequest( req )
    .then( email => getOrCreateUser( email ) )
    .then( user => updateRequesWithUserId( req, user ) )
    .then( () => next() )
    ;

}

module.exports = function () {
  
    // The conventions for express middleware appears to be
    // app.use( middleware() ). So just return the getUser
    // function to follow the convention.
    return addUserIdToRequest;
};

