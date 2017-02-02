const Card = require( '../card-model' );

module.exports = {

    getCards ( request ) {

        // request
        //       = { 
        //           userId: Id of the user making the request
        //           queryParams: {
        //               statusFilter: // cards status filter ( 'complete', 'active', 'any' )
        //           }

        //         };

        let filterCriteria = {
            createdBy: request.userId          
        }

        // add status filter if one was defined
        const statusFilters = [ 'complete', 'active' ];

        if ( statusFilters.findIndex( ( n ) => n == request.queryParams.statusFilter ) != -1 ) {
            filterCriteria.status = request.queryParams.statusFilter;
        }

        return Card
                .find( filterCriteria )
                ;
    }
}