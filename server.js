// Load environmnet variables from .env if there is one
require('dotenv').config();

const express = require( 'express' );

// security
const jwt = require('express-jwt');


// logging
const logger = require( './logger' );
const morgan = require( 'morgan' );

// request handling
const expressRequestId = require( 'express-request-id' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );

// create express application 
const app = express();

app.use( express.static( __dirname + '/public' ) );


// 1. Configure security for the application using OAuth2 via Auth0.com
//
// Secure all route  
var jwtCheck = jwt({
  secret: process.env.CARDSPACE_SECURITY_CLIENT_SECRET,
  audience: process.env.CARDSPACE_SECURITY_CLIENT_ID
});

app.use( jwtCheck );

// 2. Configure logging for the application
//
// http://tostring.it/2014/06/23/advanced-logging-with-nodejs/
//
// pass output from the morgan middleware into winston and set morgan
// to log every request to the console.
app.use( morgan( "combined", { 'stream': logger.stream } ) );
app.use( morgan( 'dev' ) );


// 3. Configure the request handling
//
// add the body content to the req.body, parsing as json:
//  * application/x-www-form-urlencoded
//  * application/json
//  * parse application/vnd.api+json
app.use( bodyParser.urlencoded( { 'extended':'true' } ) );
app.use( bodyParser.json() );          
app.use( bodyParser.json( { type: 'application/vnd.api+json' } ) );
app.use( cors() );
app.use( expressRequestId() );


// 4. set up the routes
app.use( require( './resources') );


app.listen( normalizePort( process.env.CARDSPACE_LISTEN_PORT ) || 8081 );


// Normalize a port into a number, string, or false.
function normalizePort( val ) {
  var port = parseInt( val, 10 );

  return port >= 0
       ? port
       : false; 
}