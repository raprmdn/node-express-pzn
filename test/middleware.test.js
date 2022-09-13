import express from 'express';
import request from 'supertest';

const app = express();

const logger = (req, res, next) => {
    console.log(`Request received: ${req.method} ${req.originalUrl}`);
    next();
}

const addPoweredBy = (req, res, next) => {
    res.set('X-Powered-By', 'Express');
    next();
}

const apiKeyMiddleware = (req, res, next) => {
    if (req.query.apiKey) {
        next();
    } else {
        res.status(401).end();
    }
}

const requestTimeMiddleware = (req, res, next) => {
    req.requestTime = Date.now();
    next();
}

app.use(logger);
app.use(apiKeyMiddleware);
app.use(addPoweredBy);
app.use(requestTimeMiddleware);

app.get('/', (req, res) => {
    res.send(`Hello Response`);
});

app.get('/rafi', (req, res) => {
    res.send(`Hello Rafi`);
});

app.get('/time', (req, res) => {
    res.send(`Hello, Today is ${req.requestTime}`);
});

test('Test Response Middleware', async () => {
    const response = await request(app).get('/').query({ apiKey: '1234' });

    expect(response.get('X-Powered-By')).toBe('Express');
    expect(response.text).toBe('Hello Response');
})

test('Test Response Middleware 2', async () => {
    const response = await request(app).get('/rafi').query({ apiKey: '1234' });

    expect(response.get('X-Powered-By')).toBe('Express');
    expect(response.text).toBe('Hello Rafi');
})

test('Test Response Middleware Unauthorized', async () => {
    const response = await request(app).get('/rafi');

    expect(response.status).toBe(401);
});

test('Test Response Middleware Time', async () => {
    const response = await request(app).get('/time').query({ apiKey: '1234' });

    expect(response.get('X-Powered-By')).toBe('Express');
    expect(response.text).toContain('Hello, Today is');
})