const Card = require( '../models/card' );
const errors = require( '../errors/errors' );
const PermissionError = require( '../errors/PermissionError' );

const canUpdateCard = ( card, userId ) => {

    if ( card.createdBy != userId )  {
        throw new PermissionError( errors.notAllowedToUpdateCard );
    }
    return card;
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
        //            (optional) url:         // url that the card should be set to
        //          }
        //       } 
        //     }

        return Card
                 .findById( request.commandParams.cardId )
                 .then( card => card ? canUpdateCard( card, request.userId ) : card )
                 .then( card => card ? card.update( request.commandParams.update ) : card )
                 ;
    }
}