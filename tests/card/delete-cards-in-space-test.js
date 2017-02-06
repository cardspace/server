require( '../test-environment-setup' );


var expect = require( 'chai' ).expect;
var Promise = require('bluebird')
var command = require( '../../app/card/commands/delete-cards-in-space' )

function createRepository( cards ) {

    var removedSpaceId = null;
    var removedCards = [];

    return {

        findBySpaceId: ( spaceId ) => {

            removedSpaceId = spaceId;

            return new Promise( ( resolve, reject ) => {
                resolve(cards );
            })
        },

        remove: ( card ) => {
            removedCards.push( card );
            return card;
        },

        getRemovedSpaceId: () => {
            return removedSpaceId;
        },

        getRemovedCards: () => {

            return removedCards;
        }

    }

}

let createRequest = ( cards ) => {

    return {
        commandParams: {
            spaceId: 'a-space-id'
        },
        repository: createRepository( cards )
    }

}


let arraysMatch = ( arr1, arr2 ) => {

    return arr1.reduce(  
        ( acc, value ) => acc && arr2.indexOf( value ) != -1,
        true
    );

}

describe( 'delete-cards-in-space', () => {

    var cards = [  {}, {}, {} ];

    it( 'will ask the repository for the cards in the space', () => {

        let request = createRequest( cards );

        command
            .deleteCardsInSpace( request )
            .then( result => 
                expect( request.commandParams.spaceId )
                    .equal( request.repository.getRemovedSpaceId() )
             );

    });


    it( 'will ask the repository to remove each card in the space', () => {

        let request = createRequest( cards );

        command
            .deleteCardsInSpace( request  )
            .then( result => {

                var removedCards = request.repository.getRemovedCards();

                expect( arraysMatch( cards, removedCards )).equal( true );            
            });
        
    });

    it( 'will return a promise with an array of the removed card', () => {

        let request = createRequest( cards );

        command
            .deleteCardsInSpace( request )
            .then( result => {

                let removed = request.repository.getRemovedCards();

                expect( arraysMatch( result, removed ) ).equal( true )

            });
    } ) 

} )

