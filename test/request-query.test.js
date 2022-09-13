import express from 'express';
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
    res.send(`Hello ${req.query.firstName} ${req.query.lastName}`);
});

test('Test Request Query', async () => {
    const response = await request(app)
        .get('/')
        .query({ firstName: 'Rafi', lastName: 'Putra Ramadhan' });

    expect(response.text).toBe('Hello Rafi Putra Ramadhan');
})