const addCardCommand = require( '../../card/commands/add-card-command' );

const createCard = ( request ) => {

    const addCardRequest = {

        userId : request.userId,
        cardDetails : {
            title   : request.commandParams.title,
            text    : request.commandParams.text,
            spaceId : request.commandParams.spaceId
        },
        factory    : request.cardFactory,
        repository : request.cardRepository

    }

    return addCardCommand
            .addCard( addCardRequest )
            .then( card => { console.log( card ); return card }) ;

}

module.exports = {


    addCardInSpace( request ) {

        //   request
        //       = {
        //           userId:  id of the user making the request
        //           commandParams: {
        //               spaceId: id of the space to be deleted
        //               title: card title
        //               text: card text
        //           }
        //           spaceRepository : space repository
        //           cardRepository  : card repository
        //           cardFactory     : card factory 
        //       }        

        return request
                 .spaceRepository
                 .findById( request.commandParams.spaceId )
                 .then( space => { console.log( 'space', space ); return space })
                 .then( space => space ? createCard( request ) : space )

    }
}