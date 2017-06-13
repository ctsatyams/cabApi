// Don't commit this file to your public repos. This config is for first-run
exports.creds = {
    // mongoose_auth_local: 'mongodb://localhost/tasklist', // Your mongo auth uri goes here
    clientID: 'ad1d4f8e-15c0-4f77-bfae-87ed3dbbff9e',
       clientSecret: 'k1Aiu1DtPx4cVld2pvGRRPI15h6JdQzjeLdZ29R49Qw=',
    audience: 'https://cabdataapi.azurewebsites.net',
    // you cannot have users from multiple tenants sign in to your server unless you use the common endpoint
    // example: https://login.microsoftonline.com/common/.well-known/openid-configuration
    identityMetadata: 'https://login.microsoftonline.com/707118c9-65c0-45b3-a435-33efe37cf0cc/.well-known/openid-configuration',
    validateIssuer: true, // if you have validation on, you cannot have users from multiple tenants sign in to your server
    passReqToCallback: false,
    loggingLevel: 'info' // valid are 'info', 'warn', 'error'. Error always goes to stderr in Unix.



};
