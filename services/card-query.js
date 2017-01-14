const Card = require( '../models/card' );
const errors = require( '../errors/errors' );
const PermissionError = require( '../errors/PermissionError' );


const canViewCard = ( card, userId ) => {

    if ( card.createdBy != userId )  {
        throw new PermissionError( errors.notAllowedToViewCard );
    }
    return card;
}


module.exports = {

    getCard( request ) {

        return Card
                 .findById( request.queryParams.cardId )
                 .then( card => canViewCard( card, request.userId ) )
                 ;

    }
}