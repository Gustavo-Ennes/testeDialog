require("./mock");
const request = require("supertest");
const { app } = require("../app");
const { getNewToken } = require("../controllers/authController");
const { User } = require("../models/User");
const { Profile } = require("../models/Profile");

describe("PROFILE controllers: ", () => {
    beforeEach(jest.clearAllMocks);
    afterEach(jest.clearAllMocks);

    it("should create a new profile", async () => {
        User.findOne.mockReturnValueOnce({
            email: "as@as",
            id: 1,
        });

        Profile.create.mockReturnValueOnce({
            name: "name",
            description: "dev",
            userId: 1,
            id: 1,
        });

        const response = await request(app)
            .post("/api/profiles")
            .set("Authorization", getNewToken({ email: "as@as", profile: {} }))
            .send({
                name: "name",
                description: "dev",
                userId: 1,
            });
        const data = JSON.parse(response.text);

        expect(response.status).toBe(201);
        expect(data).toHaveProperty("name", "name");
        expect(data).toHaveProperty("description", "dev");
        expect(data).toHaveProperty("userId", 1);
    });

    it("shouldn't create a profile without a Authorization header", async () => {
        const response = await request(app).post("/api/profiles").send({
            name: "name",
            description: "dev",
            userId: 1,
        });
        const data = JSON.parse(response.text);

        expect(response.status).toBe(401);
        expect(data).toHaveProperty("error", "'authorization' header needed.");
    });

    it("shouldn't create a profile without a valid user id", async () => {
        User.findOne.mockReturnValueOnce(null);

        const response = await request(app)
            .post("/api/profiles")
            .set("Authorization", getNewToken({ email: "as@as", profile: {} }))
            .send({
                name: "name",
                description: "dev",
            });
        const data = JSON.parse(response.text);

        expect(response.status).toBe(404);
        expect(data).toHaveProperty(
            "error",
            "User should exists before it's profile."
        );
    });

    it("shouldn't create a profile without a name", async () => {
        User.findOne.mockReturnValueOnce({
            email: "as@as",
            id: 1,
        });

        const response = await request(app)
            .post("/api/profiles")
            .set("Authorization", getNewToken({ email: "as@as", profile: {} }))
            .send({
                description: "dev",
                userId: 1,
            });
        const data = JSON.parse(response.text);

        expect(response.status).toBe(404);
        expect(data).toHaveProperty(
            "error",
            "User should exists before it's profile."
        );
    });

    it("shouldn't create a profile without a description", async () => {
        User.findOne.mockReturnValueOnce({
            email: "as@as",
            id: 1,
        });

        const response = await request(app)
            .post("/api/profiles")
            .set("Authorization", getNewToken({ email: "as@as", profile: {} }))
            .send({
                name: "gustavo",
                userId: 1,
            });
        const data = JSON.parse(response.text);

        expect(response.status).toBe(404);
        expect(data).toHaveProperty(
            "error",
            "User should exists before it's profile."
        );
    });

    it("should get the profile of a valid user", async () => {
        Profile.findByPk.mockReturnValueOnce({
            name: "name",
            description: "dev",
            userId: 1,
        });
        const response = await request(app)
            .get("/api/profiles/1")
            .set("Authorization", getNewToken({ email: "as@as", profile: {} }));
        const data = JSON.parse(response.text);

        expect(response.status).toBe(200);
        expect(data).toHaveProperty("name", "name");
        expect(data).toHaveProperty("description", "dev");
    });

    it("shouldn't get a profile without a auth header", async () => {
        const response = await request(app).get("/api/profiles/1");
        const data = JSON.parse(response.text);

        expect(response.status).toBe(401);
        expect(data).toHaveProperty("error", "'authorization' header needed.");
    });

    it("shouldn't get a profile without a valid user id", async () => {
        Profile.findByPk.mockReturnValueOnce(null);
        const response = await request(app)
            .get("/api/profiles/1")
            .set("Authorization", getNewToken({ email: "as@as", profile: {} }));
        const data = JSON.parse(response.text);

        expect(response.status).toBe(404);
        expect(data).toHaveProperty("error", "Profile not found");
    });

    it("should delete a profile", async () => {
        const profileToDelete = { id: 1, destroy: jest.fn() };
        Profile.findByPk.mockReturnValueOnce(profileToDelete);
        const response = await request(app)
            .delete("/api/profiles/1")
            .set("Authorization", getNewToken({ email: "as@as", profile: {} }));

        expect(response.status).toBe(200);
        expect(profileToDelete.destroy).toHaveBeenCalled();
    });

    it("shouldn't delete a profile without a auth header", async () => {
        const response = await request(app).delete("/api/profiles/1");
        const data = JSON.parse(response.text);

        expect(response.status).toBe(401);
        expect(data).toHaveProperty("error", "'authorization' header needed.");
    });

    it("shouldn't delete anything if no profile exists", async () => {
        Profile.findByPk.mockReturnValueOnce(null);
        const response = await request(app)
            .delete("/api/profiles/1")
            .set("Authorization", getNewToken({ email: "as@as", profile: {} }));
        const data = JSON.parse(response.text);

        expect(response.status).toBe(404);
        expect(data).toHaveProperty("error", "Profile not found");
    });

    it("should update the profile name", async () => {
        const profileToDelete = { id: 1, name: "altamiro", save: jest.fn() };
        Profile.findByPk.mockReturnValueOnce(profileToDelete);
        const response = await request(app)
            .put("/api/profiles/")
            .set("Authorization", getNewToken({ email: "as@as", profile: {} }))
            .send({
                name: "gustavo",
                id: 1,
            });
        const data = JSON.parse(response.text);

        expect(response.status).toBe(200);
        expect(data).toHaveProperty("name", "gustavo");
        expect(profileToDelete.save).toHaveBeenCalled();
    });

    it("should update the profile description", async () => {
        const profileToDelete = {
            id: 1,
            description: "desc1",
            save: jest.fn(),
        };
        Profile.findByPk.mockReturnValueOnce(profileToDelete);
        const response = await request(app)
            .put("/api/profiles/")
            .set("Authorization", getNewToken({ email: "as@as", profile: {} }))
            .send({
                description: "descBETTER",
                id: 1,
            });
        const data = JSON.parse(response.text);

        expect(response.status).toBe(200);
        expect(data).toHaveProperty("description", "descBETTER");
        expect(profileToDelete.save).toHaveBeenCalled();
    });

    it("shouldn't update without the auth header", async () => {
        const response = await request(app).put("/api/profiles/").send({
            description: "descBETTER",
            id: 1,
        });
        const data = JSON.parse(response.text);

        expect(response.status).toBe(401);
        expect(data).toHaveProperty("error", "'authorization' header needed.");
    });

    it("shouldn't update without a profile id", async () => {
        const response = await request(app)
            .put("/api/profiles/")
            .set("Authorization", getNewToken({ email: "as@as", profile: {} }))
            .send({
                description: "descBETTER",
            });
        const data = JSON.parse(response.text);

        expect(response.status).toBe(400);
        expect(data).toHaveProperty(
            "error",
            "Update needs id plus name or description"
        );
    });
    it("shouldn't updateif there's nothing to update(name, description)", async () => {
        const response = await request(app)
            .put("/api/profiles/")
            .set("Authorization", getNewToken({ email: "as@as", profile: {} }))
            .send({
                id: 1,
            });
        const data = JSON.parse(response.text);

        expect(response.status).toBe(400);
        expect(data).toHaveProperty(
            "error",
            "Update needs id plus name or description"
        );
    });
});
