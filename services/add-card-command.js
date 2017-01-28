const Card = require( '../models/card' );
const User = require( '../models/user' );

module.exports = {

    addCard( request ) {
        
      let card 
            = new Card({
                title: request.cardDetails.title.trim(),
                text: request.cardDetails.text.trim(),
                createdBy: request.userId,
                dateAdded: Date.now()
              });

       return card
                .save()
                ;
    
    }
}