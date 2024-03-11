const supertest = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app } = require('./test-utils/web');
const { users, createTestUser } = require('./test-utils/dummy-users');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: 'boo_testing' });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('GET /profile', () => {
    beforeAll(async () => {
        await createTestUser();
    });

    it('should retrieve correct profile', async () => {
        const result = await supertest(app)
            .get(`/profile/${users[0]._id}`)
            .set('authorization', users[0].name);

        expect(result.status).toBe(200);
        expect(result.body.data._id).toBe(users[0]._id);
        expect(result.body.data.name).toBe(users[0].name);
    });

    it('should block unauthorized user', async () => {
        const result = await supertest(app)
            .get(`/profile/${users[0]._id}`);

        expect(result.status).toBe(401);
    });

    it('should return 404 when access unregistered id', async () => {
        const result = await supertest(app)
            .get(`/profile/${99}`)
            .set('authorization', users[0].name);

        expect(result.status).toBe(404);
    });
});