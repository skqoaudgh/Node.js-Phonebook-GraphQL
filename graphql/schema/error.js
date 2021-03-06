exports.errorName = {
    NOT_FOUND_ACCOUNT: 'NOT_FOUND_ACCOUNT',
    CONFLICT_ACCOUNT: 'CONFLICT_ACCOUNT',
    INVALID_JSON_INPUT: 'INVALID_JSON_INPUT',
    UNAUTHRIZED: 'UNAUTHRIZED',
    NOT_FOUND_ITEM: 'NOT_FOUND_ITEM',
    AUTHENTICATION_FAILED: 'AUTHENTICATION_FAILED'
}

exports.errorType = {
    NOT_FOUND_ACCOUNT: {
        message: 'The user does not exist.',
        statusCode: 404
    },
    NOT_FOUND_ITEM: {
        message: 'The item does not exist.',
        statusCode: 404
    },
    CONFLICT_ACCOUNT: {
        message: 'The specified account or nickname already exists',
        statusCode: 409
    },
    CONFLICT_NUMBER: {
        message: 'The specified number already exists',
        statusCode: 409
    },
    INVALID_JSON_INPUT: {
        message: 'The value provided for the JSON nodes in the request body was not in the correct format.',
        statusCode: 400       
    },
    UNAUTHRIZED: {
        message: 'The ID and password you provided for the JSON nodes in the request body did not match.',
        statusCode: 401      
    },
    AUTHENTICATION_FAILED: {
        message: 'Server failed to authenticate the request. Make sure the value of the Authorization header is formed correctly including the signature.',
        statusCode: 403
    }
}