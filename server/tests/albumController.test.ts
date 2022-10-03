// @ts-nocheck
import Koa from 'koa';
import bodyParser from 'koa-bodyparser'
import { router } from '../router'
import request  from 'supertest';
import { Album, User } from '../models/schema';

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

const MockAlbum = {
    id: "633703c4a9baea65b9af6688",
    title: "testAlbum2",
    date: Date.now(),
    description: "test album",
    favorite: true,
    coverImg: "localhost://testAlbum.com",
    sharedWith: ["111122223333"],
    images: ["localhost://testImage.com"],
}

  afterEach(async() => {
    await User.deleteMany()
    await Album.deleteMany()
    // await mongoose.connection.close()
})

// test getAllUsers function
describe('POST /albums endpoint returns error', () => {
    it('POST /albums should return a 400 error if there is no corresponding album or user', async() => {
       // need to insert userId first 
        const response = await request(app.callback())
            .post('/albums')
            .send({
                userId: null, 
                album: null
            })
            .set('Accept','application/json')
        expect(response.statusCode).toBe(400);
    })
})

describe('POST /albums endpoint returns success', () => {
  it('POST /albums should return success', async() => {
     // need to insert userId first 
      const newUserRes = await request(app.callback())
          .post('/new-user')
          .send(mockUser)
          .set('Accept','application/json')
      expect(newUserRes.statusCode).toBe(201);
      mockUser.id = newUserRes.body._id
      const numAlbums = mockUser.albums.length

      const response = await request(app.callback())
          .post('/albums')
          .send({
              userId: mockUser.id, 
              album: MockAlbum
          })
          .set('Accept','application/json')
      console.log('response body',response.body)
      expect(response.statusCode).toBe(201);
      // test that the number of album is defined (given success)
      expect(response.body.length).toBeDefined();
  })
})

describe('DELETE /delete endpoint returns success', () => {
  it('DELETE /delete should return success', async() => {
     // add new user with albums array
      const newUserRes = await request(app.callback())
          .post('/new-user')
          .send(mockUser)
          .set('Accept','application/json')
      expect(newUserRes.statusCode).toBe(201);
      mockUser.id = newUserRes.body._id

      const response = await request(app.callback())
          .delete('/delete')
          .send({
              userId: mockUser.id, 
          })
          .set('Accept','application/json')
      // delete albums successfully
      expect(response.statusCode).toBe(204);
 
      const {body, statusCode} = await request(app.callback())
            .post('/user')
            .send(mockUser)
            .set('Accept','application/json')
      expect(statusCode).toBe(200);
      // albums to be empty array after delete
      expect(body.albums).toMatchObject([])
  })
})

describe('DELETE /delete endpoint with missing user details', () => {
  it('DELETE /delete without user details should return a 500 error', async() => {
      const response = await request(app.callback())
          .delete('/delete')
          .send({
              userId: null, 
          })
          .set('Accept','application/json')
      // delete albums successfully
      expect(response.statusCode).toBe(500);
  })
})