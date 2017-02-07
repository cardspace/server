const modelBuilder = require( '../../services/model/model-builder' );
const modelNames = require( '../../services/model/model-names' );
const mongoose = require( 'mongoose' );

const spaceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String },
    status: {
        type: String,
        enum: [ 'active', 'complete' ],
        default: 'active'
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, index: true }, 
    dateAdded: { type: Date, required: true }
});

const Space =  modelBuilder.build( modelNames.Space, spaceSchema );

module.exports = Space;