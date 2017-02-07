// Services provide a level of abstaction over the 
// basic mongoose infrastructure, they are intended to
// aid unit testing as in the test you can just fake
// these and pass them into the command.
const repositoryBuilder = require( '../../services/model/repository-builder' );

const Card = require( './card-model' );


const factory = ( state ) => {

    return new Card( state );
}

const repository = repositoryBuilder( Card, ( context ) => context.card );

repository.findBySpaceId = ( spaceId ) => {
    return Card.find( { inSpaceId: spaceId } )
}

module.exports = {
    factory:  factory,
    repository: repository
}
