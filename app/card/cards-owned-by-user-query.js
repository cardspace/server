const Card = require( './card-model' );

module.exports = {

    getCards ( request ) {

        return Card
                .find( { createdBy: request.userId  })
                ;
    }
}