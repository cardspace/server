const cors = require( 'cors' );
const express = require( 'express' );
const logger = require( '../../services/logger' );
const requestUser = require( '../../services/security/request-user' );
const response = require( '../../services/response' );
const router = express.Router();

const spaceServices = require( './space-services' );

const addSpaceCommand = require( './commands/add-space-command' );

const spacesOwnedByUserQuery = require( './queries/spaces-owned-by-user-query' )



// resource: /v1/space - get, post

// todo: use spaceDto rather than the loacally defined function.

var createDto = ( space ) => {

  return {
    id: space._id,
    title: space.title,
    text: space.text,
    status: space.status,
    dateAdded: space.dateAdded
  }

}


router.options( '/', cors() );

router.get( '/', ( req, res ) => {
    logger.logRequestInfo( req, 'Started' );

    let request 
          = {
              userId:  requestUser.getUserId( req ),
          }


    spacesOwnedByUserQuery
        .getSpaces( request )
        .then( spaces => spaces.map( createDto ) )
        .then( spaces => response.success( req, res, spaces ) )
        .catch( error => response.error( req, res, error ) );

})

router.post( '/', ( req, res ) => {
    logger.logRequestInfo( req, 'Started' );

    let request 
            = {
                userId: requestUser.getUserId( req ),
                commandParams: {
                    title: req.body.title,
                    text: req.body.text
                },
                factory: spaceServices.factory,
                repository: spaceServices.repository
            }

    addSpaceCommand
        .addSpace( request )
        .then( newSpace => createDto( newSpace ) )
        .then( newSpace => response.created( req, res, newSpace, `/v1/space/${newSpace.id}` ) )
        .catch( error => response.error( req, res, error ) );
} )

module.exports = router;
