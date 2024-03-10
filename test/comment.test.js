const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { app } = require('./test-utils/web');
const { 
    users, 
    createTestUser, 
    deleteTestUser, 
    getTestUser 
} = require('./test-utils/dummy-users');
const { comments } = require('./test-utils/dummy-comments');

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

describe('POST /profile/:profileId/comments', () => {
    beforeAll(async () => {
        await createTestUser();
    });

    it('should create new comment with full votes', async () => {
        const profile = await getTestUser();

        const result = await supertest(app)
            .post(`/profile/${profile._id}/comments`)
            .set('authorization', users[1].name)
            .send(comments[0]);

        const check = await supertest(app)
            .get(`/profile/${profile._id}/comments`)
            .set('authorization', users[1].name);

        expect(result.status).toBe(201);
        expect(check.body.data[0].userId).toBe(comments[0].userId);
        expect(check.body.data[0].profileId).toBe(comments[0].profileId);
        expect(check.body.data[0].comment).toBe(comments[0].comment);
        expect(check.body.data[0].votes.mbti).toBe(comments[0].votes.mbti);
        expect(check.body.data[0].votes.enneagram).toBe(comments[0].votes.enneagram);
        expect(check.body.data[0].votes.zodiac).toBe(comments[0].votes.zodiac);
    });

    it('should create new comment with only one vote', async () => {
        const profile = await getTestUser();

        const result = await supertest(app)
            .post(`/profile/${profile._id}/comments`)
            .set('authorization', users[2].name)
            .send(comments[1]);

        const check = await supertest(app)
            .get(`/profile/${profile._id}/comments`)
            .set('authorization', users[1].name);

        expect(result.status).toBe(201);
        expect(check.body.data[0].userId).toBe(comments[1].userId);
        expect(check.body.data[0].profileId).toBe(comments[1].profileId);
        expect(check.body.data[0].comment).toBe(comments[1].comment);
        expect(check.body.data[0].votes.mbti).toBe(comments[1].votes.mbti);
    });

    it('should block unauthorized user', async () => {
        const profile = await getTestUser();

        const result = await supertest(app)
            .post(`/profile/${profile._id}/comments`)
            .send(comments[0]);

        expect(result.status).toBe(401);
    });

    it('should failed to create comment with bad payload', async () => {
        const profile = await getTestUser();
        delete comments[0].comment;

        const result = await supertest(app)
            .post(`/profile/${profile._id}/comments`)
            .set('authorization', users[1].name)
            .send(comments[0]);

        expect(result.status).toBe(400);
    });

    it('should return 404 when post comment to unregistered profile id', async () => {
        const result = await supertest(app)
            .post(`/profile/${99}/comments`)
            .set('authorization', users[1].name)
            .send(comments[0]);

        expect(result.status).toBe(404);
    });
});