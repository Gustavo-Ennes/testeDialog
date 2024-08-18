require("../mock");
const {
    getPosts,
    createPost,
    likePost,
} = require("../../controllers/postController");
const { Post } = require("../../models/Post");
const { Profile } = require("../../models/Profile");

describe("POST | Unitary", () => {
    it("should get the posts", async () => {
        const mockedPosts = [{ id: 1, text: "text" }];
        Post.findAll.mockReturnValueOnce(mockedPosts);
        const req = { params: { profileId: 1 } };
        const res = {
            json: jest.fn().mockReturnValueOnce(mockedPosts),
        };

        const retrievedPosts = await getPosts(req, res);

        expect(Post.findAll).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(mockedPosts);
        expect(retrievedPosts).toEqual(mockedPosts);
    });

    it("should create the posts", async () => {
        const createPayload = { text: "text", profileId: 1 };
        const mockedPost = { id: 1, ...createPayload };
        Profile.findOne.mockReturnValueOnce({ id: 1 });
        Post.create.mockReturnValueOnce(mockedPost);
        const req = { body: createPayload };
        const res = {
            json: jest.fn().mockReturnValueOnce(mockedPost),
            status: jest.fn().mockReturnThis(),
        };

        const retrievedPost = await createPost(req, res);

        expect(Post.findAll).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(mockedPost);
        expect(retrievedPost).toEqual(mockedPost);
    });

    it("should like a post", async () => {
        const likes = 22;
        Post.findByPk.mockReturnValueOnce({
            id: 1,
            text: "text",
            likes,
            save: jest.fn(),
        });
        const req = { params: { id: 1 } };
        const res = {
            json: jest.fn().mockReturnValueOnce({ likes: likes + 1 }),
            status: jest.fn().mockReturnThis(),
        };

        const likeResponse = await likePost(req, res);

        expect(Post.findAll).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ likes: likes + 1 });
        expect(likeResponse).toHaveProperty("likes", likes + 1);
    });
});
