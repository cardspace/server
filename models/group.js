const modelBuilder = require( './model-builder' );
const mongoose = require( 'mongoose' );

const groupSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    cards : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
    dateAdded: { type: Date, required: true }
});

const Group = modelBuilder.build( 'Group', groupSchema );

module.exports = Group;