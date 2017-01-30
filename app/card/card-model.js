const modelBuilder = require( '../../services/model/model-builder' );
const modelNames = require( '../../services/model/model-names' );
const mongoose = require( 'mongoose' );

const cardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String },
    status: {
        type: String,
        enum: [ 'active',  'complete'],
        default: 'active'
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, index: true }, 
    dateAdded: { type: Date, required: true }
});

const Card =  modelBuilder.build( modelNames.Card, cardSchema );

module.exports = Card;