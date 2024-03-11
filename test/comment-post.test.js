const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { app } = require('./test-utils/web');
const { 
    users, 
    createTestUser, 
    getTestUser, 
    deleteTestUser
} = require('./test-utils/dummy-users');
const { 
    comments, 
    deleteTestComments, 
    createTestComents, 
    getTestComents,
} = require('./test-utils/dummy-comments');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: 'boo_testing' });
});

afterAll(async () => {
    await mongoServer.stop();
});

describe('POST /profile/:profileId/comments', () => {
    let profile;

    beforeAll(async () => {
        await createTestUser();
        profile = await getTestUser();
    });
    
    afterAll(async () => {
        await deleteTestUser();
    });
    
    afterEach(async () => {
        await deleteTestComments();
    });

    it('should create new comment with full votes', async () => {

        const result = await supertest(app)
            .post(`/profile/${profile._id}/comments`)
            .set('authorization', users[1].name)
            .send(comments[0]);

        const check = await supertest(app)
            .get(`/profile/${profile._id}/comments`)
            .set('authorization', users[1].name);

        expect(result.status).toBe(201);
        expect(check.body.data[0].user._id).toBe(comments[0].user);
        expect(check.body.data[0].profile).toBe(comments[0].profile);
        expect(check.body.data[0].comment).toBe(comments[0].comment);
        expect(check.body.data[0].votes.mbti).toBe(comments[0].votes.mbti);
        expect(check.body.data[0].votes.enneagram).toBe(comments[0].votes.enneagram);
        expect(check.body.data[0].votes.zodiac).toBe(comments[0].votes.zodiac);
    });

    it('should create new comment with only one vote', async () => {
        const result = await supertest(app)
            .post(`/profile/${profile._id}/comments`)
            .set('authorization', users[2].name)
            .send(comments[1]);

        const check = await supertest(app)
            .get(`/profile/${profile._id}/comments`)
            .set('authorization', users[2].name);

        expect(result.status).toBe(201);
        expect(check.body.data[0].user._id).toBe(comments[1].user);
        expect(check.body.data[0].profile).toBe(comments[1].profile);
        expect(check.body.data[0].comment).toBe(comments[1].comment);
        expect(check.body.data[0].votes.mbti).toBe(comments[1].votes.mbti);
    });

    it('should block unauthorized user', async () => {
        const result = await supertest(app)
            .post(`/profile/${profile._id}/comments`)
            .send(comments[0]);

        expect(result.status).toBe(401);
    });

    it('should block unauthorized user with invalid authorization', async () => {
        const result = await supertest(app)
            .post(`/profile/${profile._id}/comments`)
            .set('authorization', 'invalid user name')
            .send(comments[0]);

        expect(result.status).toBe(401);
    });

    it('should failed to create comment with bad payload', async () => {
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