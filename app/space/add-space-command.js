const Space = require( './space-model' );

module.exports = {

    addSpace(  request ) {

        // request 
        //    = {
        //          userId:  id of the user making the request
        //          commandParams {
        //              title:  space title
        //              text:   text description for the space
        //          }       
        //      }

        let space 
              = new Space({
                  title: request.commandParams.title.trim(),
                  text: request.commandParams.text.trim(),
                  createdBy: request.userId,
                  dateAdded: Date.now()
              });

        return space.save();

    }

}