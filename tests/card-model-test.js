require('dotenv').config();

process.env[ 'CARDSPACE_LOGFILE' ] = './log/test-runs.log'; 

var expect = require( 'chai' ).expect;
var Card = require( '../app/card/card-model' );


describe( 'card model', () =>  {
  
  it( 'will raise an error if the title is missing', () => {
    var card = new Card();
 
    card.validate( ( error ) => {
        expect( error.errors.title ).to.exist;
        done();
    } ); 

  });

  it( 'will treat an empty string as a missing title', () => {
      var card = new Card();

      card.title = '';

      card.validate( ( error ) => {
          expect( error.errors.title ).to.exist;
          done();
      } );

  } );

  it( 'will default to an active status', () => {
    var card = new Card();
 
    expect( card.status ).to.equal( 'active' );

  });

  it( 'can be set to completed status', () => {
      var card = new Card();

      card.title = 'A Title';
      card.status = 'completed';

      card.validate( ( error ) => {
          expect( error.errors.status ).to.not.exist;
          done();
      } );

  } );

  it( 'throw an error if the status is niether active or completed', () => {
    var card = new Card();

    card.title = 'A Title';
    card.status = 'status';

    card.validate( ( error ) => {
      expect( error.errors.status ).to.exist;
      done();
    } );
  } )
});
