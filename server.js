console.log( 'server.js' );

const express = require( 'express' );

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

// 1. Configure logging for the application
//
// http://tostring.it/2014/06/23/advanced-logging-with-nodejs/
//
// pass output from the morgan middleware into winston and set morgan
// to log every request to the console.
app.use( morgan( "combined", { 'stream': logger.stream } ) );
app.use( morgan( 'dev' ) );

// 2. Configure the request handling
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

// 3. set up the routes
app.use( require( './routes') );

app.listen( 8081 );