import express from 'express';
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
    res.send(`Hello ${req.query.name}`);
});

test('Test Query Param', async () => {
    const response = await request(app).get('/').query({ name: 'Rafi' });
    expect(response.text).toBe('Hello Rafi');
})