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
    getLikes
} = require('./test-utils/dummy-comments');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: 'boo_testing' });
});

afterAll(async () => {
    await mongoServer.stop();
});

describe('GET /profile/:profileId/comments', () => {
    let profile;

    beforeAll(async () => {
        await createTestUser();
        await createTestComents();
        profile = await getTestUser();
    });

    afterAll(async () => {
        await deleteTestUser();
    });

    it('should get all comments in correct profile id', async () => {
        const result = await supertest(app)
            .get(`/profile/${profile._id}/comments`)
            .set('authorization', users[1].name);

        expect(result.status).toBe(200);
        expect(result.body.data[0].user._id).toBe(comments[0].user);
        expect(result.body.data[0].profile).toBe(comments[0].profile);
        expect(result.body.data[0].comment).toBe(comments[0].comment);
        expect(result.body.data[0].votes.mbti).toBe(comments[0].votes.mbti);
        expect(result.body.data[0].votes.enneagram).toBe(comments[0].votes.enneagram);
        expect(result.body.data[0].votes.zodiac).toBe(comments[0].votes.zodiac);
    });

    it('should get all comments in correct profile id with latest comment sort', async () => {
        const result = await supertest(app)
            .get(`/profile/${profile._id}/comments?sort=recent`)
            .set('authorization', users[1].name);

        expect(result.status).toBe(200);
    });

    it('should get all comments in correct profile id with MBTI filter', async () => {
        const result = await supertest(app)
            .get(`/profile/${profile._id}/comments?filter=MBTI-INFJ`) // the FE should pass the filter data => FILTER TYPE-FILTER VALUE
            .set('authorization', users[1].name);

        expect(result.status).toBe(200);
        expect(result.body.data[0].votes.mbti).toBe('INFJ');
    });

    it('should block unauthorized user', async () => {
        const result = await supertest(app)
            .post(`/profile/${profile._id}/comments`);

        expect(result.status).toBe(401);
    });

    it('should block unauthorized user with invalid authorization', async () => {
        const result = await supertest(app)
            .post(`/profile/${profile._id}/comments`)
            .set('authorization', 'invalid user name')
            .send(comments[0]);

        expect(result.status).toBe(401);
    });
});