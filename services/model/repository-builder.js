module.exports = ( Model, contextModel ) => {

    return {

        add ( model ) {
            return model.save();
        },

        findById ( id  ) {
            return Model.findById( id );
        },

        remove( model ) {
            return model.remove();
        },

        update( context ) {
            // context
            //   card: the card to be updated
            //   update: the updates to apply to the card
            return contextModel( context ).update( context.update ) 
        }
    }
}