// Services provide a level of abstaction over the 
// basic mongoose infrastructure, they are intended to
// aid unit testing as in the test you can just fake
// these and pass them into the command.
const repositoryBuilder = require( '../../services/model/repository-builder' );

const Space = require( './space-model' );

const factory = ( state ) => {

    // state
    //    title     : space title
    //    text      : space text
    //    createdBy : user id of the person who creatd the space
    //    dateAdded : the date that the space was added to the system.

    return new Space( state );
}

const repository = repositoryBuilder( Space, ( context ) => context.space );


module.exports = {
    factory: factory,
    repository: repository
}