// @ts-nocheck
import Koa from 'koa';
import bodyParser from 'koa-bodyparser'
import { router } from '../router'
import request  from 'supertest';
import { User } from '../models/schema';
import { mockUser } from '../mocks/mocks';

const HOSTNAME = 'localhost';
const PORT = 3001;

export const app = new Koa();

app.use(bodyParser());
app.use(router.routes());

afterEach(async() => {
    await User.deleteMany()
    // await mongoose.connection.close()
})


// test postUser and getAllUser functions with user details
describe('POST /new-user endpoint with user details', () => {
    it('POST /new-user should return the user details with a success response', async() => {
        const response = await request(app.callback())
            .post('/new-user')
            .send(mockUser)
            .set('Accept','application/json')
        expect(response.statusCode).toBe(201);
        expect(response.body.userName).toBe('testUser')
        expect(response.body.userImg).toBe('localhost://testUser.com')
        expect(response.body.contacts).toMatchObject(['user2345678'])
        expect(response.body.friendsAlbums).toMatchObject([
            {
              userId: "user111111",
              albumId: "album111111"    
            }
          ])
        // test getAllUser function
        const getAllUserResponse = await request(app.callback()).get('/userlist');
        expect(getAllUserResponse.statusCode).toBe(200);
    })
})

// test postUser function without supplying user details
describe('POST /new-user endpoint without user details', () => {
    it('POST /new-user should return 400 error if no user details are provided', async() => {
        const response = await request(app.callback())
            .post('/new-user')
            .send(null)
            .set('Accept','application/json')
        expect(response.statusCode).toBe(400);
    })
})

// test postUser and getUser functions
describe('POST /user returns the same user details after POST /new-user', () => {
    it('POST /user should return a success response', async() => {
        const response = await request(app.callback())
            .post('/new-user')
            .send(mockUser)
            .set('Accept','application/json')
        expect(response.statusCode).toBe(201);
        // to insert id into the user object
        response.body.id = response.body._id.toString()
        
        const {body, statusCode} = await request(app.callback())
            .post('/user')
            .send(response.body)
            .set('Accept','application/json')
        expect(statusCode).toBe(200);
        expect(body.userName).toBe('testUser')
        expect(body.userImg).toBe('localhost://testUser.com')
        expect(body.contacts).toMatchObject(['user2345678'])
    })
})

// test getUser function without supplying user details
describe('POST /user without passing user details', () => {
    it('POST /user should return 404 error if no user details are passed', async() => {
        const {body, statusCode} = await request(app.callback())
        .post('/user')
        .send(null)
        .set('Accept','application/json')
    expect(statusCode).toBe(400);
    })
})

// test postUserList function with user details
describe('PUT /update-user returns the edited user details', () => { 
    it('PUT /update-user should return a success response with the edited details', async() => {
        const response = await request(app.callback())
            .post('/new-user')
            .send(mockUser)
            .set('Accept','application/json')
        // to insert id into the user object
        mockUser._id = response.body._id
        const newContact = "user1112223334455"
        mockUser.contacts.push(newContact)
        // change user contacts
        const res = await request(app.callback())
            .put('/update-user')
            .send(mockUser)
            .set('Accept','application/json')
        expect(res.statusCode).toBe(201);
        expect(res.body.contacts).toMatchObject(["user2345678","user1112223334455"])
    })
})

// test postUserList function without user details
describe('PUT /update-user without user details', () => { 
    it('PUT /update-user without sending user details should return a 400 error', async() => {
        const response = await request(app.callback())
            .post('/new-user')
            .send(mockUser)
            .set('Accept','application/json')

        // change user contacts
        // sending null request to the end-point
        const res = await request(app.callback())
            .put('/update-user')
            .send(null)
            .set('Accept','application/json')
        expect(res.statusCode).toBe(400);
    })
})

// test deleteUser function
describe('DELETE /delete-user returns success', () => { 
    it('DELETE /delete-user successfully should return a success status', async() => {
        // add user to the database
        const addUserRes = await request(app.callback())
            .post('/new-user')
            .send(mockUser)
            .set('Accept','application/json')
        expect(addUserRes.statusCode).toBe(201);
        mockUser.id = addUserRes.body._id
        // delete user
        const deleteRes = await request(app.callback())
            .delete('/delete-user')
            .send(mockUser)
            .set('Accept','application/json')
        expect(deleteRes.statusCode).toBe(204);

    })
})

// 
describe('DELETE /delete-user without user details', () => { 
    it('DELETE /delete-user should return 400 error without user details', async() => {
        // delete user
        const deleteRes = await request(app.callback())
            .delete('/delete-user')
            .send(null)
            .set('Accept','application/json')
        expect(deleteRes.statusCode).toBe(400);
    })
})

describe('DELETE /delete-contacts returns success', () => { 
    it('DELETE /delete-contacts successfully should return a success status', async() => {
        // add user to the database
        const addUserRes = await request(app.callback())
            .post('/new-user')
            .send(mockUser)
            .set('Accept','application/json')
        expect(addUserRes.statusCode).toBe(201);
        mockUser.id = addUserRes.body._id
        // delete user
        const deleteRes = await request(app.callback())
            .delete('/delete-contacts')
            .send(mockUser)
            .set('Accept','application/json')
        expect(deleteRes.statusCode).toBe(204);

        const {body, statusCode} = await request(app.callback())
            .post('/user')
            .send(mockUser)
            .set('Accept','application/json')
        expect(statusCode).toBe(200);
        expect(body.contacts).toMatchObject([]);
    })
})

describe('DELETE /delete-contacts without user details', () => { 
    it('DELETE /delete-contacts should return 400 error without user details', async() => {
        // delete user
        const deleteRes = await request(app.callback())
            .delete('/delete-contacts')
            .send(null)
            .set('Accept','application/json')
        expect(deleteRes.statusCode).toBe(400);
    })
})