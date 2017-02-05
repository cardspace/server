require( '../test-environment-setup' );

var expect = require( 'chai' ).expect;

var command = require( '../../app/card/commands/delete-all-cards-in-space' )


describe( 'delete-all-cards-in-space', () => {

    var firstSpaceId = 'a';
    var secondSpaceId = 'b'
    var user = 'userA';

    var cards = [  {}, {}, {} ];

    let removedSpaceId = null;
    let removedCards = [];

    let cardRepository = {

        findBySpaceId: function( spaceId ) {
            removedSpaceId = spaceId;

            return cards;
        },

        remove: function ( card ) {
    
            removedCards.push( card )
        }
    }


    let request = {
        commandParams: {
            spaceId: 'a-space-id'
        },
        repository: cardRepository
    }


    beforeEach( () => {
        spaceId = null;
        removedCards = [];
    })

    it( 'will ask the repository for the cards in the space', () => {

        command.deleteCardsInSpace(  
           request
        );

        expect( request.commandParams.spaceId ).equal( removedSpaceId );
    });


    it( 'will ask the repository to remove each card in the space', () => {

        command.deleteCardsInSpace(  
           request
        );

        expect( cards.length  ).equal( removedCards.length );
    });

} )

