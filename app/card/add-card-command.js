const Card = require( './card-model' );

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