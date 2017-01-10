// database
const mongoose = require( 'mongoose' );
const bluebird = require( 'bluebird' );
const logger = require( '../logger' );
const config = require( '../config' );


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