require( '../test-environment-setup' );

var expect = require( 'chai' ).expect;
var Space = require( '../../app/space/space-model' );


describe( 'space model', () => {

    describe( 'status', () => {

        it( 'will allow a space to be set to active', () => {

            var space = new Space();

            space.status = 'complete';

            space.validate( ( error ) => {
                expect( error.errors.status ).to.not.exist;
                done();
            } )

        } )

        it( 'will allow a space to be set to complete', () => {

            var space = new Space();

            space.status = 'complete';

            space.validate( ( error ) => {
                expect( error.errors.status ).to.not.exist;
            } )

        } )

        it( 'will raise an error is not active or complete', () => {
            var space = new Space();

            space.status = 'this is not a status';

            space.validate( ( error ) => {
                expect( error.errors.status ).to.exist;
            } )
        } )

        it( 'will default to active', () => {
           var space = new Space();

           expect( space.status ).to.equal( 'active' );


        })
    })

});
