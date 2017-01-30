const Card = require( './card-model' );
const errors = require( '../../services/errors/errors' );
const PermissionError = require( '../../services/errors/PermissionError' );

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

const updateCardStatus = (  userId, cardId, status ) => {

    return Card
            .findById( cardId )
            .then( card => card ? canUpdateCardStatus( card, userId ) : card )
            .then( card => card ? createUpdateContext( card, status ) : card )
            .then( context => context ? context.card.update( context.update ) : card )
            ;

}


module.exports = {

    //  request = {
    //       userId : // id of the user making the request
    //       commandParams: {
    //         cardId: // id of the card to be updated
    //       } 
    //     }

    markCardAsCompleted ( request ) {
       
        return updateCardStatus( 
            request.userId,
            request.commandParams.cardId, 
            'complete' 
        );

    },

    markCardAsActive ( request ) {
       
       return updateCardStatus( 
            request.userId,
            request.commandParams.cardId, 
            'active'
       );

    }    
    

}