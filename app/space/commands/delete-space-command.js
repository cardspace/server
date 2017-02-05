const errors = require( '../../../services/errors/errors' );
const PermissionError = require(  '../../../services/errors/PermissionError' );
const deleteCardsInSpaceCommand = require( '../../card/commands/delete-cards-in-space' );


const canDeleteSpace = ( space, userId ) => {

    if ( space.createdBy != userId ) {
        throw new PermissionError( errors.notAllowedToDeleteSpace );
    }
    return space;
}

const deleteCards = ( space, cardRepository ) => {

    let request = {
        commandParams : {
            spaceId: space.id
        },
        repository: cardRepository
    }

    deleteCardsInSpaceCommand
        .deleteCardsInSpace( request );
    
    return space;
}

module.exports = {

    deleteSpace ( request ) {

        //   request
        //       = {
        //           userId:  id of the user making the request
        //           commandParams: {
        //               spaceId: id of the space to be deleted
        //           }
        //           spaceRepository: space repository,
        //           cardRepository: card repository
        //       }

        return request
                .spaceRepository
                .findById( request.commandParams.spaceId  )
                .then( space => space ? canDeleteSpace( space, request.userId ) : space )
                .then( space => space ? deleteCards( space, request.cardRepository ) : space )
                .then( space => space ? request.spaceRepository.remove( space ) : space )
                ;

    }
}