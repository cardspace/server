const Card = require( './card-model' );
const errors = require( '../../services/errors/errors' );
const PermissionError = require( '../../services/errors/PermissionError' );


const canDeleteCard = ( card, userId ) => {

    if ( card.createdBy != userId )  {
        throw new PermissionError( errors.notAllowedToDeleteCard );
    }
    return card;
}



module.exports = {

    deleteCard( request ) {

        //  request = {
        //       userId : // id of the user making the request
        //       commandParams: {
        //         cardId: // id of the card to be updated
        //       } 
        //     }
        
        return Card
                 .findById( request.commandParams.cardId )
                 .then( card => card ? canDeleteCard( card, request.userId ) : card )
                 .then( card => card ? card.remove() : card  )
                 ;

    }

}