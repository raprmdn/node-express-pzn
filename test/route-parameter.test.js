import express from 'express';
import request from 'supertest';

const app = express();

app.get('/products/:id', (req, res) => {
    res.send(`Product: ${req.params.id}`);
});

app.get('/categories/:id(\\d+)', (req, res) => {
    res.send(`Category: ${req.params.id}`);
});

// app.get('/seller/:idSeller/products/:idProduct', (req, res) => {
//     res.send(`ID Seller: ${req.params.idSeller} - ID Product: ${req.params.idProduct}`);
// });

test('Test Route Parameter', async () => {
    let response = await request(app).get('/products/rafi');
    expect(response.text).toBe('Product: rafi');

    response = await request(app).get('/products/salah');
    expect(response.text).toBe('Product: salah');

    response = await request(app).get('/categories/1234');
    expect(response.text).toBe('Category: 1234');

    response = await request(app).get('/categories/salah');
    expect(response.status).toBe(404);
})