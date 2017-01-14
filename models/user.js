const modelBuilder = require( './model-builder' );
const mongoose = require( 'mongoose' );
const Group = require( './group' ); 

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    allCardsGroup : { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    dateAdded: { type: Date, required: true }
});


const User = modelBuilder.build( 'User', userSchema );

User.findByEmail = ( email ) => {

    return User
             .findOne( { 'email' : email.toLowerCase() } );
}

User.createNormalisedUser = ( email ) => {

    const normalisedEmail 
            = email.toLowerCase();

    const dateAdded 
            = Date.now();

    let allCardsGroup
          = new Group({
             title: `${normalisedEmail} - all cards`,
             dateAdded: dateAdded
            });

    return allCardsGroup
            .save()
            .then( group => {

                return new User( { 
                    email: normalisedEmail,
                    allCardsGroup: group._id,
                    dateAdded: dateAdded
                })

            })
            .then( user => user.save() )

}

module.exports = User;