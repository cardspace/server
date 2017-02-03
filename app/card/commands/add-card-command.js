module.exports = {

    addCard( request ) {

        // request {
        //      userId:  id of user creating the card
        //      cardDetails {
        //          title: card title string
        //          text:  card text string
        //          spaceId: id of the space that the card belong to if there is one 
        //      },
        //      factory: factory method that will create an new instance of the model
        //      repository that will add the model to the repository. 
        // }

        // Todo: add an id column to the card and use that as the unique id
        //       currently relying on the generated id but that is a really 
        //       bad idea.  It is hard to test and when you start to combine
        //       operations you end up having to persist to the data store 
        //       just to get an id.

        const trimField = ( value ) => {

            return value ? value.trim() : value;
        }
        let update = {}

        var titleValue = trimField( request.cardDetails.title );
        if ( titleValue ) {
            update.title = titleValue
        }

        var textValue = trimField( request.cardDetails.text );
        if ( textValue ) {
            update.text = textValue
        }

        if ( request.cardDetails.spaceId ) {
            update.inSpaceId = request.cardDetails.spaceId;
        }


        update.createdBy = request.userId;
        update.dateAdded = Date.now();


        let card = request.factory( update );

        return request.repository.add( card )
    }
}