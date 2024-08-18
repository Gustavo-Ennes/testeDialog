const verifyEmailAndPassword = (body) =>
    body.email != null &&
    body.email != "" &&
    body.password != null &&
    body.password != "";

module.exports = { verifyEmailAndPassword };
