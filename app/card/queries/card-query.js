const Card = require( '../card-model' );
const errors = require( '../../../services/errors/errors' );
const PermissionError = require( '../../../services/errors/PermissionError' );


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