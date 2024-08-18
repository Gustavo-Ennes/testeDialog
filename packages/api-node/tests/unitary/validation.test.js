const {
    verifyEmailAndPassword,
    verifyNameAndDescription,
} = require("../../validation");

describe("Validation | Unitary ", () => {
    describe("Email and password", () => {
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
    describe("Name and description", () => {
        it("should validate name and description in a object", () => {
            const obj = {
                name: "Gustavo",
                description: "dev",
            };

            const isVerified = verifyNameAndDescription(obj);
            expect(isVerified).toBeTruthy;
        });

        it("shouldn't validate if name is missing", () => {
            const obj = {
                description: "dev",
            };

            const isVerified = verifyNameAndDescription(obj);
            expect(isVerified).toBeFalsy;
        });

        it("shouldn't validate if name is empty", () => {
            const obj = {
                name: "",
                description: "dev",
            };

            const isVerified = verifyNameAndDescription(obj);
            expect(isVerified).toBeFalsy;
        });

        it("shouldn't validate if description is missing", () => {
            const obj = {
                name: "dev",
            };

            const isVerified = verifyNameAndDescription(obj);
            expect(isVerified).toBeFalsy;
        });

        it("shouldn't validate if description is empty", () => {
            const obj = {
                name: "gustavo",
                description: "",
            };

            const isVerified = verifyNameAndDescription(obj);
            expect(isVerified).toBeFalsy;
        });
    });
});
