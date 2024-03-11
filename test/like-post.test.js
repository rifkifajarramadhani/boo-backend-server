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

describe('POST /profile/:profileId/comments/:commentId', () => {
    let profile;
    let comments;

    beforeAll(async () => {
        await createTestUser();
        await createTestComents();
        profile = await getTestUser();
        comments = await getTestComents();
    });

    afterAll(async () => {
        await deleteTestUser();
    });

    it('should like comment', async () => {
        const result = await supertest(app)
            .post(`/profile/${profile._id}/comments/${comments[0]._id}`)
            .set('authorization', users[1].name)
            .send();

        expect(result.status).toBe(201);
    });
    
    it('should unlike comment', async () => { // this is concurrent with previous test case, so if run only this test probably will cause error or test invalid
        const result = await supertest(app)
            .post(`/profile/${profile._id}/comments/${comments[0]._id}`)
            .set('authorization', users[1].name)
            .send();
    
        expect(result.status).toBe(202);
    })

    it('get likes count by comment id', async () => {
        // like user 1
        await supertest(app)
            .post(`/profile/${profile._id}/comments/${comments[0]._id}`)
            .set('authorization', users[0].name)
            .send();

        // like user 2
        await supertest(app)
            .post(`/profile/${profile._id}/comments/${comments[0]._id}`)
            .set('authorization', users[1].name)
            .send();

        // like user 3
        await supertest(app)
            .post(`/profile/${profile._id}/comments/${comments[0]._id}`)
            .set('authorization', users[2].name)
            .send();

        // like user 4
        await supertest(app)
            .post(`/profile/${profile._id}/comments/${comments[1]._id}`)
            .set('authorization', users[3].name)
            .send();

        // like user 5
        await supertest(app)
            .post(`/profile/${profile._id}/comments/${comments[2]._id}`)
            .set('authorization', users[4].name)
            .send();

        const result = await supertest(app)
            .get(`/profile/${profile._id}/comments/${comments[0]._id}`)
            .set('authorization', users[0].name);
            await getTestComents();
        expect(result.body.data[0].count).toBe(3);
    });

    it('should block unauthorized user', async () => {
        const result = await supertest(app)
            .post(`/profile/${profile._id}/comments/${comments[0]._id}`);

        expect(result.status).toBe(401);
    });

    it('should block unauthorized user with invalid authorization', async () => {
        const result = await supertest(app)
            .post(`/profile/${profile._id}/comments/${comments[0]._id}`)
            .set('authorization', 'invalid user name')
            .send();

        expect(result.status).toBe(401);
    });
});