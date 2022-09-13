import express from 'express';
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
    res.set({
        "X-Powered-By": "Express",
        "X-Author": "raprmdn"
    });
    res.send('Hello World!');
});

test('Test Response', async () => {
    const response = await request(app).get('/');

    expect(response.text).toBe('Hello World!');
    expect(response.get('X-Powered-By')).toBe('Express');
    expect(response.get('X-Author')).toBe('raprmdn');
})