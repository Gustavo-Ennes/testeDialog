const verifyEmailAndPassword = (body) =>
    body.email != null &&
    body.email != "" &&
    body.password != null &&
    body.password != "";

const verifyNameAndDescription = (body) =>
    body.name != null &&
    body.name != "" &&
    body.description != null &&
    body.description != "";

module.exports = { verifyEmailAndPassword, verifyNameAndDescription };
