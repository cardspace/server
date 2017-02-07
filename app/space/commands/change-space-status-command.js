
const errors = require( '../../../services/errors/errors' );
const PermissionError = require( '../../../services/errors/PermissionError' );

const canUpdateSpaceStatus = ( space, userId ) => {

    if ( space.createdBy != userId ) {
        throw new PermissionError( errors.notAllowedToUpdateSpace )
    }
    return space;
}

const createUpdateContext = ( space, status ) => {

    // check we have a status 

    return {
        space,
        update: { status: status }
    }
}

const updateSpaceStatus = ( repository, userId, spaceId, status ) => {


    return repository
            .findById( spaceId )
            .then( space => space ? canUpdateSpaceStatus( space, userId ) : space )
            .then( space => space ? createUpdateContext( space, status ) : space )
            .then( context => context ? repository.update( context ) : context )
            ;

}


module.exports = {


    markSpaceAsActive(  request  ) {

        // request = {
        //      userId: id of the user making the request
        //      commandParams: {
        //          spaceId: id of the space to be updated    
        //      }   
        // }

        // return:  Promise of {
        //             space : the space that was updated
        //             update: {
        //                  status: active
        //              }
        //          }

        return updateSpaceStatus( 
            request.repository,
            request.userId,
            request.commandParams.spaceId, 
            'active' 
        );

    },

    markSpaceAsComplete(  request  ) {

        // request = {
        //      userId: id of the user making the request
        //      commandParams: {
        //          spaceId: id of the space to be updated    
        //      }   
        // }

        // return:  Promise of {
        //             space : the space that was updated
        //             update: {
        //                  status: complete 
        //              }
        //          }

        return updateSpaceStatus( 
            request.repository,
            request.userId,
            request.commandParams.spaceId, 
            'complete' 
        );

    }

}