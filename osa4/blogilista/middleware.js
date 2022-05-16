const tokenExtractor = (request, response, next) => {
    const authorizationmessage = request.get('authorization')
    if (authorizationmessage && authorizationmessage.toLowerCase().startsWith('bearer')) {
        request.token = authorizationmessage.substring(7)
    }
    else{
        request.token= null
    }
    next()
}
module.exports = tokenExtractor