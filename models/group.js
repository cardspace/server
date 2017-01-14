const modelBuilder = require( './model-builder' );
const modelNames = require( './model-names' );
const mongoose = require( 'mongoose' );

const groupSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    cards : [{ type: mongoose.Schema.Types.ObjectId, ref: modelNames.Card }],
    dateAdded: { type: Date, required: true }
});

const Group = modelBuilder.build( modelNames.Group, groupSchema );

module.exports = Group;