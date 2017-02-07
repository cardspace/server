const Space = require( '../space-model' );

module.exports = {

    getSpaces( request ) {

        // request 
        //      = {
        //          userId: owner of the spaces
        //          queryParams: {
        //              status: the filter to se the 
        //          }
        // }

        let filterCriteria = {
            createdBy: request.userId
        }


        // add status filter
        const statusFilters = [ 'complete', 'active' ];

        if ( statusFilters.findIndex( ( status ) => status == request.queryParams.status ) != -1 ) {
            filterCriteria.status = request.queryParams.status            
        }

        return Space.find( filterCriteria );

    }
}