const express = require( 'express' );
const logger = require( '../../services/logger' );
const requestUser = require( '../../services/security/request-user' );
const response = require( '../../services/response' );
const router = express.Router();

const spaceServices = require( './space-services' );
const cardServices = require( '../card/card-services' );
const cardDto = require( '../card/card-dto' );

const deleteSpaceCommand = require( './commands/delete-space-command' );
const updateSpaceCommand = require( './commands/update-space-command' );
const addCardInSpaceCommand = require( './commands/add-card-in-space' );
const changeSpaceStatusCommand = require( './commands/change-space-status-command' );

const cardsInSpaceQuery = require( './queries/cards-in-space-query' );

// resource: /v1/space/:id  - put, delete
//           /v1/space/:id/completed   - put
//           /v1/space/:id/active      - put 
//           /v1/space/:id/cards       - get, post


// todo: document each route so that it maked it simple when deubging.
// todo: move createSummaryDto to a spaceDto module.

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
                spaceRepository: spaceServices.repository,
                cardRepository: cardServices.repository
            }

    deleteSpaceCommand
        .deleteSpace( request )
        .then( space => space ? createSummaryDto( space ) : space )
        .then( space => response.successOrNotFound( req, res, space ) )
        .catch( error => response.invalidIdOrError( req, res, error ) )
        ;

} );

router.put( '/:id/completed', ( req, res ) => {
    logger.logRequestInfo( req, 'Started' );

    const request
            = {
                userId: requestUser.getUserId( req ),
                commandParams: { 
                    spaceId: req.params.id
                },
                repository: spaceServices.repository
            }

    changeSpaceStatusCommand
        .markSpaceAsComplete( request )
        .then( space => space ? createSummaryDto( space ) : space )
        .then( space => response.successOrNotFound( req, res, space ) )
        .catch( error => response.invalidIdOrError( req, res, error ) )
    
})



router.put( '/:id/activate', ( req, res ) => {
    logger.logRequestInfo( req, 'Started' );

    const request
            = {
                userId: requestUser.getUserId( req ),
                commandParams: { 
                    spaceId: req.params.id
                },
                repository: spaceServices.repository
            }

    changeSpaceStatusCommand
        .markSpaceAsActive( request )
        .then( space => space ? createSummaryDto( space ) : space )
        .then( space => response.successOrNotFound( req, res, space ) )
        .catch( error => response.invalidIdOrError( req, res, error ) )
    
})


/* Create a card within a space.
 * 
  POST http://< host >/space/:id/cards

  Header: Authorization: Beare < Oauth2 identity token > 
  Header: Content-Type:  application/json
  Body:
  {
    "title" : "A Card title",
    "text"  : "Body text of card."
  }
*/
router.post( '/:id/cards', ( req, res ) => {

    logger.logRequestInfo( req, 'Started' );

    const request 
            = {
                userId:  requestUser.getUserId( req ),
                commandParams: {
                    spaceId: req.params.id,
                    title: req.body.title,
                    text: req.body.text
                },
                spaceRepository: spaceServices.repository,
                cardRepository: cardServices.repository,
                cardFactory: cardServices.factory 
            }

    addCardInSpaceCommand 
        .addCardInSpace( request )
        .then( card => card ? cardDto.createSummaryDto( card ) : card )
        .then( dto => response.successOrNotFound( req, res, dto ) )
        .catch( error => response.invalidIdOrError( req, res, error ) );

})

/* Create a card within a space.
 
  GET http://< host >/space/:id/cards?status=['active' || 'complete']

  Header: Authorization: Beare < Oauth2 identity token > 
  Header: Content-Type:  application/json

*/
router.get( '/:id/cards', ( req, res ) => {

    var request 
         = {
                userId:  requestUser.getUserId( req ),
                spaceId: req.params.id,
                queryParams:{
                    status: req.query.status
                }
         }

    cardsInSpaceQuery
        .getCards( request )
        .then( allCards => allCards.map( cardDto.createSummaryDto ) )
        .then( allCards => response.success( req, res, allCards ) )
        .catch( error => response.error( req, res, error ) );

})


module.exports = router;