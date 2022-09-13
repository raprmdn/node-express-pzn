import express from 'express';
import request from 'supertest';

const app = express();

const router = express.Router();

router.use((req, res, next) => {
    console.log(`Received request at ${req.originalUrl}`);
    next();
});

router.get('/feature/a', (req, res) => {
    res.send('Feature A');
});

test('Test Route Disable', async () => {
    let response = await request(app).get('/feature/a');
    expect(response.status).toBe(404);
});

test('Test Route Enable', async () => {
    app.use(router);
    let response = await request(app).get('/feature/a');
    expect(response.text).toBe('Feature A');
});