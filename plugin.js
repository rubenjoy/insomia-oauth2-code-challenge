const sha256 = require('crypto-js/sha256');

function generateCodeVerifier() {
    return generateRandomString(96);
}

function generateRandomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function generateCodeChallenge(code_verifier) {
    return sha256(code_verifier);
}

function base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

module.exports.templateTags = [{
    name: 'oauth2CodeChallenge',
    displayName: 'OAuth2 Code Challenge',
    description: 'Generate Code Challenge',
    args: [],

    async run (context) {
        code = sha256(base64URLEncode(generateCodeVerifier()));
        return code;
    }
}]
