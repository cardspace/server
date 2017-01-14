const ValidationError = require( './ValidationError' );
const errors = require( '../data/errors' );
const mongoose = require( 'mongoose' );

const mongooseErrorTranslationTable = {
    required: errors.requiredField,
}

const normalisers = {

    mongooseValidationError : {
        isForError( error ) {
            return error instanceof mongoose.Error.ValidationError;
        },

        normalise( error ) {
            var fieldErrors = {};

            for ( var fieldName in error.errors ) {
                var mongooseError = error.errors[ fieldName ].kind;
                var validationError = mongooseErrorTranslationTable[ mongooseError ];

                var fieldError = fieldErrors[ fieldName ];

                if ( fieldError === undefined ) {
                    fieldError = ValidationError.createFieldError( fieldName ) 
                    fieldErrors[ fieldName ] = fieldError;
                }
                fieldError.errors.push( validationError );
            }

            return new ValidationError( [], fieldErrors, error );
        }
    },

    mongoDbUniqueConstraintViolationError : {
        isForError( error ) {
           return error.name === 'MongoError' && error.code === 11000;
        },

        normalise( error ) {
            
            // Sigh :(
            // 
            // These errors come from MongoDb rather than mongoose, so
            // they have a different format.  The error is generated
            // via a violation on the unique index so does not directly
            // report the field name, it report the index name.  This
            // means there is only hacky string parsing way to get the
            // the field name.
            
            // Error message format :
            //   E11000 duplicate key error index: test.x.$a_1 dup key: { : 1.0 }
            
            // https://github.com/Automattic/mongoose/issues/2129

            var fieldName = error.message.split(".$")[1];
            fieldName = fieldName.split(" dup key")[0];
            fieldName = fieldName.substring(0, fieldName.lastIndexOf("_"));

            fieldErrors = {  };
            fieldError = ValidationError.createFieldError( fieldName ) 
            fieldError.errors.push( errors.uniqueField );

            fieldErrors[ fieldName ] = fieldError;

            return new ValidationError( [], fieldErrors, error );
        }
    }
}

module.exports =  {

    normalise( error ) {

        for( var normaliser in normalisers ) {

            if ( normalisers[ normaliser ].isForError( error ) ) {
                return normalisers[ normaliser ].normalise( error )
            }
        }
        return error;
    }
}