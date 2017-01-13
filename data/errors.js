// Note - 
//   this is good for front end identification of error to field but
//   for debuggins this introduces difficulty because we are translating
//   an error which makes it harder to find the origin of the problem.
//   To mitigate that the error translations should be logged.

module.exports = {
    requiredField : { code: 00001, message: 'A value is required for this field.' },
    uniqueField : { code: 00002, message: 'The value must be unique for this field.' },
    emailMissingFromRequest : { code: 00003, message: "The users email was not suppplied in the identity token." },
}