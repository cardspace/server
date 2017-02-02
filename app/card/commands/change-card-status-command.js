const errors = require( '../../../services/errors/errors' );
const PermissionError = require( '../../../services/errors/PermissionError' );

const canUpdateCardStatus = ( card, userId ) => {

    if ( card.createdBy != userId )  {
        throw new PermissionError( errors.notAllowedToUpdateCard );
    }
    return card;
}

const createUpdateContext = ( card, status ) => {

    // check we have a status 

    return {
        card,
        update: { status: status }
    }
}

const updateCardStatus = ( repository, userId, cardId, status ) => {

    return repository
            .findById( cardId )
            .then( card => card ? canUpdateCardStatus( card, userId ) : card )
            .then( card => card ? createUpdateContext( card, status ) : card )
            .then( context => context ? repository.update( context ) : context )
            ;

}


module.exports = {

    //  request = {
    //       userId : // id of the user making the request
    //       commandParams: {
    //         cardId: // id of the card to be updated
    //       },
    //       repository: card repository 
    //     }

    markCardAsCompleted ( request ) {
       
        return updateCardStatus( 
            request.repository,
            request.userId,
            request.commandParams.cardId, 
            'complete' 
        );

    },

    markCardAsActive ( request ) {
       
       return updateCardStatus( 
            request.repository,
            request.userId,
            request.commandParams.cardId, 
            'active'
       );

    }    

}