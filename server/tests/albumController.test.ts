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
    id: "633703c4a9baea65b9af6677",
    title: "testAlbum",
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

// describe.only('POST /albums endpoint returns success', () => {
//   it('POST /albums should return success', async() => {
//      // need to insert userId first 
//       const response = await request(app.callback())
//           .post('/albums')
//           .send({
//               userId: null, 
//               album: null
//           })
//           .set('Accept','application/json')
//       expect(response.statusCode).toBe(400);
//   })
// })