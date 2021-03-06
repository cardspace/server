const Space = require( '../space-model' );
const errors = require( '../../../services/errors/errors' );
const PermissionError = require( '../../../services/errors/PermissionError' );


const canViewSpace = ( space, userId ) => {

    if ( space.createdBy != userId )  {
        throw new PermissionError( errors.notAllowedToViewSpace );
    }
    return space;
}


module.exports = {

    getSpace( request ) {

        return Space
                 .findById( request.queryParams.spaceId )
                 .then( space => canViewSpace( space, request.userId ) )
                 ;

    }
}