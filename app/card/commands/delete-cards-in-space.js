

module.exports = {

    deleteCardsInSpace( request ) {

        // request = {
        //      commandParams : { 
        //          spaceId: // space that cards belonging to should be deleted 
        //      }
        //      repository:  card repository
        // }

        return request
                .repository
                .findBySpaceId( request.commandParams.spaceId )
                .then( cards => { 
                    cards.forEach( request.repository.remove ); 
                    return cards 
                } )
                ;
         

    }
}