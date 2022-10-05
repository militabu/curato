import Koa from 'koa';
import bodyParser from 'koa-bodyparser'
import { router } from '../router'
import request  from 'supertest';
import { Album, User } from '../models/schema';
import { mockUser, mockAlbum } from '../mocks/mocks';

const HOSTNAME = 'localhost';
const PORT = 3001;

export const app = new Koa();

app.use(bodyParser());
app.use(router.routes());


afterEach(async() => {
    await User.deleteMany()
    await Album.deleteMany()
    // await mongoose.connection.close()
})

// test postAlbum function without supplying user and album details
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

// test postAlbum function with user details
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
              album: mockAlbum
          })
          .set('Accept','application/json')
      console.log('response body',response.body)
      expect(response.statusCode).toBe(201);
      // test that the number of album is defined (given success)
      expect(response.body.length).toBeDefined();
  })
})

// test deleteAlbums with user details
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

// test deleteAlbums without user details
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