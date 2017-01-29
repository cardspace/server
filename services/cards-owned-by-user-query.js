const Card = require( '../models/card' );

module.exports = {

    getCards ( request ) {

        return Card
                .find( { createdBy: request.userId  })
                ;
    }
}