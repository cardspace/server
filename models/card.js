const modelBuilder = require( './model-builder' );
const modelNames = require( './model-names' );
const mongoose = require( 'mongoose' );

const cardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, index: true }, 
    dateAdded: { type: Date, required: true }
});

const Card =  modelBuilder.build( modelNames.Card, cardSchema );

module.exports = Card;