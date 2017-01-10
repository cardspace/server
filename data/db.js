// database
var mongoose = require( 'mongoose' );
var bluebird = require( 'bluebird' );
var logger = require( '../logger' );
var config = require( '../config' );


mongoose.Promise = bluebird;


var db = mongoose.createConnection( config.mongodb.connectionString );

// When successfully connected
db.on( 'connected', () => {  
  logger.info( 'Mongoose connected to mongodb.' );
}); 

// If the connection throws an error
db.on('error', ( error ) => {  
  logger.error( 'Mongoose connection error: ' + error );
}); 

// When the connection is disconnected
db.on( 'disconnected', () => {  
  logger.info( 'Mongoose disconnected from mongodb.' ); 
});

module.exports = db;