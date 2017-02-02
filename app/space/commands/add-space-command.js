module.exports = {

    addSpace(  request ) {

        // request {
        //      commandParams {
        //          title: card title string
        //          text:  card text string 
        //      },
        //      factory: factory method that will create an new instance of the model
        //      repository that will add the model to the repository. 
        // }

        const trimField = ( value ) => {
            return value ? value.trim() : value;
        }

        let space = request.factory({
            title: trimField( request.commandParams.title ),
            text: trimField( request.commandParams.text ),
            createdBy: request.userId,
            dateAdded: Date.now()
        });

        return request.repository.add( space );

    }

}