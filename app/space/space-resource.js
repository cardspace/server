const express = require( 'express' );
const logger = require( '../../services/logger' );
const requestUser = require( '../../services/security/request-user' );
const response = require( '../../services/response' );
const router = express.Router();

const spaceServices = require( './space-services' );
const deleteSpaceCommand = require( './commands/delete-space-command' );
const updateSpaceCommand = require( './commands/update-space-command' );


// resource: /v1/card/:id  - put, delete
const createSummaryDto = ( space ) => {

    return {
        id: space._id,
        title: space.title,
        text: space.text,
        dateAdded: space.dataAdded
    }
}


router.put( '/:id', ( req, res ) => {

    logger.logRequestInfo( req, 'Started' );

    let request 
          = {
                userId: requestUser.getUserId( req ),
                commandParams : {
                    spaceId: req.params.id,
                    update: {
                        title: req.body.title,
                        text: req.body.text
                    }
                },
                repository: spaceServices.repository
            }

     updateSpaceCommand
        .updateSpace( request )
        .then(  space => { console.log( 'space:', space  ); return space } )
        .then( space => space ? createSummaryDto( space ) : space )
        .then( space => response.successOrNotFound( req, res, space ) )
        .catch( error => response.invalidIdOrError( req, res, error ) )
        ;

});


router.delete( '/:id', ( req, res ) => {

    logger.logRequestInfo(  req, 'Started' );

    const request
            = {
                userId: requestUser.getUserId( req ),
                commandParams: {
                    spaceId: req.params.id
                },
                repository: spaceServices.repository
            }

    deleteSpaceCommand
        .deleteSpace( request )
        .then( space => space ? createSummaryDto( space ) : space )
        .then( space => response.successOrNotFound( req, res, space ) )
        .catch( error => response.invalidIdOrError( req, res, error ) )
        ;

} );

module.exports = router;