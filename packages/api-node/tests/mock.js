jest.mock("../models/User", () => ({
    User: {
        create: jest.fn(),
        findOne: jest.fn(),
    },
}));

jest.mock("../models/Profile", () => ({
    Profile: {
        findOne: jest.fn(),
        create: jest.fn(),
        findByPk: jest.fn(),
        save: () => undefined,
    },
}));

jest.mock("../models/Post", () => ({
    Post: {
        create: jest.fn(),
        findOne: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
        save: () => undefined
    },
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
