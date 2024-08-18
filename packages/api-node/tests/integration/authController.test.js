require("../mock");
const request = require("supertest");
const { app } = require("../../app");
const { User } = require("../../models/User");
const { Profile } = require("../../models/Profile");
const { JWT_SECRET } = require("../../config/auth");
const { verify, decode } = require("jsonwebtoken");
const { hash } = require("bcrypt");
const { getNewToken } = require("../../controllers/authController");

describe("AUTH controllers: ", () => {
    beforeEach(jest.clearAllMocks);
    afterEach(jest.clearAllMocks);

    it("should create a new user and return a token with valid data", async () => {
        User.findOne.mockReturnValueOnce(null);
        User.create.mockReturnValueOnce({
            email: "eu@mail.net",
            password: "some-hashed-password",
        });
        const response = await request(app).post("/api/auth/signup").send({
            email: "gustavo@ennes.dev",
            password: "12",
        });

        const data = JSON.parse(response.text);
        const decodedToken = decode(data.token);

        expect(response.status).toBe(201);
        verify(data.token, JWT_SECRET, (err, _) => {
            expect(err).toBeNull();
        });
        expect(decodedToken.email).not.toBeNull();
        expect(data).toHaveProperty("token");
        expect(data.token).not.toBeUndefined();
    });

    it("shouldn't create a new user neither return a token if missing email or password in request", async () => {
        const response = await request(app).post("/api/auth/signup").send({
            email: "gustavo@ennes.dev",
        });
        const data = JSON.parse(response.text);

        expect(response.status).toBe(400);
        expect(data.token).toBeUndefined();
        expect(data.error).toEqual("Email or password is missing.");
    });

    it("shouldn't create a new user if username already taken", async () => {
        try {
            User.findOne.mockReturnValueOnce({ email: "", password: "" });

            const response = await request(app).post("/api/auth/signup").send({
                email: "gustavo@ennes.dev",
                password: "12",
            });

            const data = JSON.parse(response.text);

            expect(response.status).toBe(400);
            expect(data.error).toEqual("Email already taken by another user.");
        } catch (error) {
            console.error(error);
        }
    });

    it("Should login with requirements meet", async () => {
        const hashedPassword = await hash("12", 12);
        User.findOne.mockReturnValueOnce({
            email: "gustavo@ennes.dev",
            password: hashedPassword,
        });
        Profile.findOne.mockReturnValueOnce({
            name: "Gustavo Ennes",
            description: "Software developer",
        });

        const response = await request(app).post("/api/auth/login").send({
            email: "gustavo@ennes.dev",
            password: "12",
        });

        const data = JSON.parse(response.text);
        const decodedToken = decode(data.token);

        expect(response.status).toBe(200);
        verify(data.token, JWT_SECRET, (err, _) => {
            expect(err).toBeNull();
        });
        expect(decodedToken.email).not.toBeNull();
        expect(decodedToken.profile).not.toBeNull();
        expect(JSON.parse(decodedToken.profile)).toHaveProperty("name");
        expect(JSON.parse(decodedToken.profile)).toHaveProperty("description");
        expect(data).toHaveProperty("token");
        expect(data.token).not.toBeUndefined();
    });

    it("shouldn't login without password or email", async () => {
        const response = await request(app).post("/api/auth/login").send({
            email: "gustavo@ennes.dev",
        });

        const data = JSON.parse(response.text);
        expect(response.status).toBe(400);
        expect(data.error).toEqual("Email or password is missing.");
    });

    it("shouldn't login no user found with given email", async () => {
        User.findOne.mockReturnValueOnce(null);
        const response = await request(app).post("/api/auth/login").send({
            email: "gustavo@ennes.dev",
            password: "12",
        });
        const data = JSON.parse(response.text);
        expect(response.status).toBe(404);
        expect(data.error).toEqual("User not found.");
    });

    it("shouldn't login if hashed password don't match", async () => {
        const hashedPassword = await hash("123", 12);
        User.findOne.mockReturnValueOnce({
            email: "gustavo@ennes.dev",
            password: hashedPassword,
        });
        const response = await request(app).post("/api/auth/login").send({
            email: "gustavo@ennes.dev",
            password: "12",
        });
        const data = JSON.parse(response.text);
        expect(response.status).toBe(401);
        expect(data.error).toEqual("Invalid password.");
    });

    it("shouldn't login if user hasn't a associate profile", async () => {
        const hashedPassword = await hash("12", 12);
        User.findOne.mockReturnValueOnce({
            email: "gustavo@ennes.dev",
            password: hashedPassword,
        });
        Profile.findOne.mockReturnValueOnce(null);
        const response = await request(app).post("/api/auth/login").send({
            email: "gustavo@ennes.dev",
            password: "12",
        });
        const data = JSON.parse(response.text);
        expect(response.status).toBe(404);
        expect(data.error).toEqual("No user profile found.");
    });

    it("should verify a valid token", async () => {
        const generatedToken = getNewToken({
            email: "eu@mail.com",
            profile: { name: "will smith", description: "um maluco no pedaço" },
        });
        const response = await request(app).post("/api/auth/token-check").send({
            token: generatedToken,
        });
        const data = JSON.parse(response.text);
        expect(response.status).toBe(200);
        expect(data.status).toEqual("valid");
    });

    it("shouldn't verify an invalid token", async () => {
        const invalidToken = getNewToken({
            email: "eu@mail.com",
            profile: { name: "will smith", description: "um maluco no pedaço" },
            expired: true,
        });
        const response = await request(app).post("/api/auth/token-check").send({
            token: invalidToken,
        });
        const data = JSON.parse(response.text);
        expect(response.status).toBe(200);
        expect(data.status).toEqual("invalid");
    });
});
