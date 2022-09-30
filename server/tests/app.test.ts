// @ts-nocheck
import Koa from 'koa';
import bodyParser from 'koa-bodyparser'
import { router } from '../router'
import request  from 'supertest';
import { User } from '../models/schema'

const HOSTNAME = 'localhost';
const PORT = 3001;

export const app = new Koa();

app.use(bodyParser());
app.use(router.routes());

const mockUser = {
    userName:"testUser",
    userImg: "localhost://testUser.com",
    contacts: ["user2345678"],
    friendsAlbums: [
      {
        userId: "user111111",
        albumId: "album111111"    
      }
    ],
    albums:[
    {
        id: "633703c4a9baea65b9af6677",
        title: "testAlbum",
        date: Date.now(),
        description: "test album",
        favorite: true,
        coverImg: "localhost://testAlbum.com",
        sharedWith: ["111122223333"],
        images: ["localhost://testImage.com"],
    }
    ]  
  }

afterEach(async() => {
    await User.deleteMany()
})

describe('GET /userlist endpoint', () => {
    it('GET /userlist should return an array with a success response', async() => {
        const response = await request(app.callback()).get('/userlist');
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject([]); // cannot use toBe or toEqual
    })
})

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
    })
})

describe('POST /new-user endpoint without user details', () => {
    it('POST /new-user should return 400 error if no user details are provided', async() => {
        const response = await request(app.callback())
            .post('/new-user')
            .send(null)
            .set('Accept','application/json')
        expect(response.statusCode).toBe(400);
    })
})

describe('POST /user returns the same user details after POST /new-user', () => {
    it('POST /user should return a success response', async() => {
        const response = await request(app.callback())
            .post('/new-user')
            .send(mockUser)
            .set('Accept','application/json')
        expect(response.statusCode).toBe(201);
        // to insert id into the user object
        response.body.id = response.body._id.toString()
        
    //    console.log('new user response:',response.body)
        const {body, statusCode} = await request(app.callback())
            .post('/user')
            .send(response.body)
            .set('Accept','application/json')
        expect(statusCode).toBe(200);
        expect(body.userName).toBe('testUser')
        expect(body.userImg).toBe('localhost://testUser.com')
        expect(body.contacts).toMatchObject(['user2345678'])
        expect(body.friendsAlbums).toMatchObject([
            {
              userId: "user111111",
              albumId: "album111111"    
            }
          ])
    })
})



