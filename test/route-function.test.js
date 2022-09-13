import express from 'express';
import request from 'supertest';

const app = express();

app.route('/products')
    .get((req, res) => res.send('Get products'))
    .post((req, res) => res.send('Add a product'))
    .put((req, res) => res.send('Update a product'));

test('Test Route Function', async () => {
    let response = await request(app).get('/products');
    expect(response.text).toBe('Get products');

    response = await request(app).post('/products');
    expect(response.text).toBe('Add a product');

    response = await request(app).put('/products');
    expect(response.text).toBe('Update a product');
})