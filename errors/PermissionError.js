function PermissionError( error ) {
    this.name = 'PermissionError';
    this.code = error.code;
    this.message = error.message;
    this.stack = (new Error()).stack;
}
PermissionError.prototype = new Error();


module.exports = PermissionError;