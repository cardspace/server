const modelBuilder = require( './model-builder' );
const modelNames = require( './model-names' );
const mongoose = require( 'mongoose' );

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    dateAdded: { type: Date, required: true }
});


const User = modelBuilder.build( modelNames.User, userSchema );

User.findByEmail = ( email ) => {

    return User
             .findOne( { 'email' : email.toLowerCase() } );
}

User.createNormalisedUser = ( email ) => {

    let user = new User( { 
        email: email.toLowerCase(),
        dateAdded: Date.now()
    });


    return user
            .save();

}

module.exports = User;