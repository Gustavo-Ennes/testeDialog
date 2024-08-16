jest.mock("../models/User", () => ({
    User: {
        create: jest.fn(),
        findOne: jest.fn(),
    },
}));

jest.mock("../models/Profile", () => ({
    Profile: { findOne: jest.fn(), create: jest.fn() },
}));

jest.mock("redis", () => ({
    createClient: () => ({
        get: jest.fn(),
        set: jest.fn(),
    }),
}));

jest.mock("../models/Post", () => ({
    Post: { findAll: jest.fn(), create: jest.fn(), findByPk: jest.fn() },
}));
