const errors = require( '../../../services/errors/errors' );
const PermissionError = require( '../../../services/errors/PermissionError' );
const Space = require( '../space-model' );


const canUpdateSpace = ( space, userId ) => {

   if ( space.createdBy != userId ) {
       throw new PermissionError( errors.notAllowedToUpdateSpace );
   }
   return space;
}

const createUpdateContext = ( space, update ) => {

    const sanatiseForUpdate = ( update ) => {

        return Object.assign(
            {},
            update,
            {
                title: update.title.trim(),
                text: update.text.trim(),
            }
        );
    }

    return {
        space,
        update: sanatiseForUpdate( update )
    }
}

module.exports = {

    updateSpace( request ) {

        // request = {
        //       userId: id of the user making the request 
        //       commandParams : {
        //           spaceId: id of the space to be updated
        //           update: {
        //               (optional) title: new title for the space
        //               (optional) text: new text for the space
        //           }
        //       }
        //   }

        return Space 
                .findById( request.commandParams.spaceId )
                .then( space => space ? canUpdateSpace( space, request.userId ) : space )
                .then( space => space ? createUpdateContext( space, request.commandParams.update ) : space )
                .then( context => context ? context.space.update( context.update ) : context )
                ;
    }

}