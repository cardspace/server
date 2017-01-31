const Space = require( './space-model' );

module.exports = {

    getSpaces( request ) {

        // request 
        //      = {
        //          userId: owner of the spaces
        // }

        let filterCriteria = {
            createdBy: request.userId
        }


        return Space.find( filterCriteria );

    }
}