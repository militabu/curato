// @ts-nocheck
import request from 'supertest';
import { app } from '../index';
import mongoose from '../db'

describe('GET /userlist endpoint', () => {
    it('/userlist endpoint should return an array with a success response', async() => {
        const response = await request(app.callback()).get('/userlist');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("[]");
    })
})




