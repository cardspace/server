const errors = require( '../../../services/errors/errors' );
const PermissionError = require(  '../../../services/errors/PermissionError' );

const canDeleteSpace = ( space, userId ) => {

    if ( space.createdBy != userId ) {
        throw new PermissionError( errors.notAllowedToDeleteSpace );
    }
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
        //           repository: space repository
        //       }

        return request
                .repository
                .findById( request.commandParams.spaceId  )
                .then( space => space ? canDeleteSpace( space, request.userId ) : space )
                .then( space => space ? request.repository.remove( space ) : space )
                ;


    }
}