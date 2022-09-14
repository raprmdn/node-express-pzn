import express from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    const name = req.cookies['name'];
    res.send(`Hello ${name}`);
});

app.post('/login', (req, res) => {
    const name = req.body.name;
    res.cookie('Login', name, { path: '/', httpOnly: true });
    res.send(`Hello ${name}`);
});

test('Test Cookie Read', async () => {
    const response = await request(app).get('/')
        .set('Cookie', 'name=Rafi;author=raprmdn');

    expect(response.text).toBe('Hello Rafi');
});

test('Test Cookie Write', async () => {
    const response = await request(app).post('/login')
        .send({ name: 'Rafi' });

    expect(response.text).toBe('Hello Rafi');
    expect(response.get('Set-Cookie').toString()).toBe('Login=Rafi; Path=/; HttpOnly');
});