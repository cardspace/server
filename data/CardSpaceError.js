// Note - 
//   this is good for front end identification of error to field but
//   for debuggins this introduces difficulty because we are translating
//   an error which makes it harder to find the origin of the problem.
//   To mitigate that the error translations should be logged.

function CardSpaceError( errors, fieldErrors  ) {
    this.name = 'CardSpaceError';
    this.stack = (new Error()).stack;

    this.errors = errors;
    this.fieldErrors = fieldErrors;
}
CardSpaceError.prototype = new Error();

CardSpaceError.createFieldError = ( fieldName ) => {
    return fieldError = { 
       fieldName: fieldName,
       errors: [ ]
    }
}


module.exports = CardSpaceError;