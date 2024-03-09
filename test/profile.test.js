const supertest = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app } = require('./test-utils/web');
const users = require('./test-utils/dummy-users');

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
            .get(`/profile/${users[0].id}`)
            .set('authorization', users[0].name);

        expect(check.body.data).toBe(null)
        excpect(result.status).toBe(201);

    });
});

describe('GET /profile', () => {

    it('should retrieve correct profile', async () => {
        const result = await supertest(app)
            .get('/profile/1')
            .set('authorization', 'A Martinez');

        // console.log(result);
    });
});