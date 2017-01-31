// Note - 
//   this is good for front end identification of error to field but
//   for debuggins this introduces difficulty because we are translating
//   an error which makes it harder to find the origin of the problem.
//   To mitigate that the error translations should be logged.

module.exports = {
    requiredField : { code: 00001, message: 'A value is required for this field.' },
    uniqueField : { code: 00002, message: 'The value must be unique for this field.' },
    emailMissingFromRequest : { code: 00003, message: "The users email was not suppplied in the identity token." },
    
    notAllowedToViewCard : { code: 00004, message: "The user does not have permission to veiw the card." },
    notAllowedToUpdateCard : { code: 00005, message: "The user does not have permission to update the card." },
    notAllowedToDeleteCard : { code: 00006, message: "The user does not have permission to delete the card." },
    
    notAllowedToUpdateSpace : { code: 00007, message: "The user does not have permission to update the space." },
    notAllowedToDeleteSpace : { code: 00008, message: "The user does not have permission to delete the space." },
}