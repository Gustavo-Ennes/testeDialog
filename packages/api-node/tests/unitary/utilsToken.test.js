const { verify } = require("jsonwebtoken");
const { getNewToken } = require("../../utils/token");
const { JWT_SECRET } = require("../../config/auth");

describe("Utils | Token", () => {
    it("should generate a valid token", () => {
        const email = "asd@asd.cs";
        const profile = {
            id: 1,
            name: "gustavo",
        };
        const token = getNewToken({ email, profile });

        verify(token, JWT_SECRET, (err, _) => {
            expect(err).toBeNull();
        });
    });

    it("should generate an expired token", () => {
        const email = "asd@asd.cs";
        const profile = {
            id: 1,
            name: "gustavo",
        };
        const token = getNewToken({ email, profile, expired: true });

        verify(token, JWT_SECRET, (err, _) => {
            expect(err).not.toBeNull();
        });
    });
});
