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

describe('POST /profile', () => {
    it('should create new user', async () => {
        const result = await supertest(app)
            .post('/profile')
            .send(users[0]);

        const check = await supertest(app)
            .get(`/profile/${users[0]._id}`)
            .set('authorization', users[0].name);

        expect(result.status).toBe(201);
        expect(check.body.data._id).toBe(users[0]._id);
        expect(check.body.data.name).toBe(users[0].name);

    });

    it('should failed to create new user with bad payload', async () => {
        delete users[0].name;
        const result = await supertest(app)
            .post('/profile')
            .send(users[0]);
        
        expect(result.status).toBe(400);
    });
});