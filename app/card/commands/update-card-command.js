const errors = require( '../../../services/errors/errors' );
const PermissionError = require( '../../../services/errors/PermissionError' );

const canUpdateCard = ( card, userId ) => {

    if ( card.createdBy != userId )  {
        throw new PermissionError( errors.notAllowedToUpdateCard );
    }
    return card;
}

const createUpdateContext = ( card, request ) => {

    const sanatiseForUpdate = ( request ) => {

        return Object.assign( 
            {},
            request,
            {
                title: request.title.trim(),
                text: request.text.trim()
            }
        );
    }


    return {
        card,
        update: sanatiseForUpdate( request )
    }
}


module.exports = {

    updateCard ( request ) {
       
        //  request = {
        //       userId : // id of the user making the request
        //       commandParams: {
        //         cardId: // id of the card to be updated
        //         update: {
        //            (optional) title:       // title that the card should be set to   
        //            (optional) description: // description that the card should be set to
        //          }
        //       }
        //       repository: cards repository
        //     }

        return request
                .repository
                .findById( request.commandParams.cardId )
                .then( card => card ? canUpdateCard( card, request.userId ) : card )
                .then( card => card ? createUpdateContext( card, request.commandParams.update ) : card )
                .then( context => context ? request.repository.update( context ) : context )
                 ;
    }
}