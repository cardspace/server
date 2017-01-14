const Card = require( '../models/card' );

module.exports = {

    getCards ( request ) {

        console.log( request );

        return Card
                .find( { createdBy: request.userId  })
                ;
    }
}