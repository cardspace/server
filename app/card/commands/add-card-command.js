module.exports = {

    addCard( request ) {

        // request {
        //  cardDetails {
        //      title: card title string
        //      text:  card text string 
        //  },
        //  factory: factory method that will create an new instance of the model
        //  repository that will add the model to the repository. 
        // }

        // Todo: add an id column to the card and use that as the unique id
        //       currently relying on the generated id but that is a really 
        //       bad idea.  It is hard to test and when you start to combine
        //       operations you end up having to persist to the data store 
        //       just to get an id.

        const trimField = ( value ) => {

            return value ? value.trim() : value;
        }

        let card = request.factory({
            title: trimField( request.cardDetails.title ),
            text: trimField( request.cardDetails.text ),
            createdBy: request.userId,
            dateAdded: Date.now()
        });

        return request.repository.add( card )
    }
}