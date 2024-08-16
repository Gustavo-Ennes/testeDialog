require("./mock");
const request = require("supertest");
const { app } = require("../app");
const { Post } = require("../models/Post");
const { Profile } = require("../models/Profile");
const { getNewToken } = require("../controllers/authController");

describe("POST controllers: ", () => {
    beforeEach(jest.clearAllMocks);
    afterEach(jest.clearAllMocks);

    it("should create a new post", async () => {
        Profile.findOne.mockReturnValueOnce({
            name: "name",
            description: "description",
            userId: 1,
        });
        Post.create.mockReturnValueOnce({
            text: "some text",
            profileId: 1,
            likes: 0,
            id: 1,
        });

        const response = await request(app)
            .post("/api/posts")
            .set("Authorization", getNewToken({ email: "as@as", profile: {} }))
            .send({
                text: "some text",
                profileId: 1,
            });
        const data = JSON.parse(response.text);

        expect(response.status).toBe(201);
        expect(data).toHaveProperty("text", "some text");
        expect(data).toHaveProperty("profileId", 1);
        expect(data).toHaveProperty("likes", 0);
    });

    it("shouldn't create a post without authorization header", async () => {
        const response = await request(app).post("/api/posts").send({
            text: "some text",
            profileId: 1,
        });
        const data = JSON.parse(response.text);

        expect(response.status).toBe(401);
        expect(data).toHaveProperty("error", "'authorization' header needed.");
    });

    it("shouldn't create a post without a valid profile", async () => {
        Profile.findOne.mockReturnValueOnce(null);
        const response = await request(app)
            .post("/api/posts")
            .set("Authorization", getNewToken({ email: "as@as", profile: {} }))
            .send({
                text: "some text",
                profileId: 1,
            });

        const data = JSON.parse(response.text);

        expect(response.status).toBe(404);
        expect(data).toHaveProperty(
            "error",
            "A profile is needed to post something."
        );
    });
    it("shouldn't create a post without text inside", async () => {
        const response = await request(app)
            .post("/api/posts")
            .set("Authorization", getNewToken({ email: "as@as", profile: {} }))
            .send({
                profileId: 1,
            });

        const data = JSON.parse(response.text);

        expect(response.status).toBe(400);
        expect(data).toHaveProperty("error", "A post needs a text.");
    });

    it("should get the posts of a specific profile", async () => {
        Post.findAll.mockReturnValueOnce([
            {
                text: "some text",
                profileId: 1,
                likes: 0,
                id: 1,
            },
        ]);
        const response = await request(app)
            .get("/api/posts/1")
            .set("Authorization", getNewToken({ email: "as@as", profile: {} }));

        const data = JSON.parse(response.text);

        expect(response.status).toBe(200);
        expect(data).toHaveLength(1);
        expect(data[0]).toHaveProperty("id", 1);
    });

    it("shouldn't get the posts if header is missing", async () => {
        const response = await request(app).get("/api/posts/1");
        const data = JSON.parse(response.text);

        expect(response.status).toBe(401);
        expect(data).toHaveProperty("error", "'authorization' header needed.");
    });
    it("shouldn't get empty array if profile don't exists", async () => {
        Post.findAll.mockReturnValueOnce([]);

        const response = await request(app)
            .get("/api/posts/11")
            .set("Authorization", getNewToken({ email: "as@as", profile: {} }));

        const data = JSON.parse(response.text);

        expect(response.status).toBe(200);
        expect(data).toHaveLength(0);
    });

    it("should like a post", async () => {
        const postToLike = {
            text: "text",
            id: 1,
            profileId: 1,
            likes: 0,
            save: jest.fn(),
        };
        Post.findByPk.mockReturnValueOnce(postToLike);

        const response = await request(app)
            .get("/api/posts/1/like")
            .set("Authorization", getNewToken({ email: "as@as", profile: {} }));
        const data = JSON.parse(response.text);

        expect(response.status).toBe(200);
        expect(postToLike.save).toHaveBeenCalled();
        expect(data).toHaveProperty("likes", 1);
    });

    it("shouldn't like a post without auth header", async () => {
        const response = await request(app).get("/api/posts/1/like");
        const data = JSON.parse(response.text);

        expect(response.status).toBe(401);
        expect(data).toHaveProperty("error", "'authorization' header needed.");
    });
});
