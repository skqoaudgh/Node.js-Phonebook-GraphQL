exports.errorName = {
    NOT_FOUND_ACCOUNT: 'NOT_FOUND_ACCOUNT',
    CONFLICT_ACCOUNT: 'CONFLICT_ACCOUNT',
    INVALID_INPUT: 'INVALID_INPUT'
}

exports.errorType = {
    NOT_FOUND_ACCOUNT: {
        message: 'The user does not exist.',
        statusCode: 404
    },
    CONFLICT_ACCOUNT: {
        message: 'The specified account or nickname already exists',
        statusCode: 409
    },
    INVALID_ACCOUNT_INPUT: {
        message: 'The value provided for the JSON nodes in the request body was not in the correct format.',
        statusCode: 400       
    }
}