const Card = require( '../../card/card-model' );

module.exports = {

    getCards ( request ) {

        // request
        //       = { 
        //           userId: Id of the user making the request
        //           spaceId: Id of the space to get the cards for
        //           queryParams: {
        //               status: // cards status filter ( 'complete', 'active', 'any' )
        //           }
        //         };

        let filterCriteria = {
            createdBy: request.userId,
            inSpaceId: request.spaceId
        }

        // add status filter if one was defined
        const statusFilters = [ 'complete', 'active' ];

        if ( statusFilters.findIndex( ( n ) => n == request.queryParams.status ) != -1 ) {
            filterCriteria.status = request.queryParams.statusFilter;
        }

        return Card
                .find( filterCriteria )
                ;
    }
}