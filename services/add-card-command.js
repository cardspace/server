const Card = require( '../models/card' );
const User = require( '../models/user' );

module.exports = {

    addCard( request ) {
        
      let card 
            = new Card({
                title: request.cardDetails.title,
                url: request.cardDetails.url,
                description: request.cardDetails.description,
                createdBy: request.userId,
                dateAdded: Date.now()
              });

       return card
                .save()
                ;
    
    }
}