const db = require( './db' );
const Card = db.model( 'Card', {
    title: String,
    url: String,
    description: String,
    dateAdded: Date
});

module.exports = Card;