// Note - 
//   this is good for front end identification of error to field but
//   for debuggins this introduces difficulty because we are translating
//   an error which makes it harder to find the origin of the problem.
//   To mitigate that the error translations should be logged.

function ValidationError( errors, fieldErrors, innerError ) {
    this.name = 'ValidationError';
    this.stack = (new Error()).stack;

    this.errors = errors;
    this.fieldErrors = fieldErrors;
    this.innerError = innerError;
}
ValidationError.prototype = new Error();

ValidationError.createFieldError = ( fieldName ) => {
    return fieldError = { 
       fieldName: fieldName,
       errors: [ ]
    }
}


module.exports = ValidationError;