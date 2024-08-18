const { verifyEmailAndPassword } = require("../../validation");

describe("Validation | Unitary", () => {
    it("should validate email and password in a object", () => {
        const obj = {
            email: "email@ennes.dev",
            password: "123",
        };

        const isVerified = verifyEmailAndPassword(obj);
        expect(isVerified).toBeTruthy;
    });

    it("shouldn't validate if email is missing", () => {
        const obj = {
            password: "123",
        };

        const isVerified = verifyEmailAndPassword(obj);
        expect(isVerified).toBeFalsy;
    });

    it("shouldn't validate if email is empty", () => {
        const obj = {
            name: "",
            password: "123",
        };

        const isVerified = verifyEmailAndPassword(obj);
        expect(isVerified).toBeFalsy;
    });

    it("shouldn't validate if password is missing", () => {
        const obj = {
            email: "123",
        };

        const isVerified = verifyEmailAndPassword(obj);
        expect(isVerified).toBeFalsy;
    });

    it("shouldn't validate if password is empty", () => {
        const obj = {
            name: "email@mai.com",
            password: "",
        };

        const isVerified = verifyEmailAndPassword(obj);
        expect(isVerified).toBeFalsy;
    });
});
