const app = require('../../app');
const superTest = require('supertest');
const request = superTest(app);
const crypto = require('crypto');

let testUsername;
let testEmail;
let testPass;

describe('test auth endpoints', () => {
  it('should return json contains token and status 201', async () => {
    const testUser = {
      firstname: 'fnTest',
      lastname: 'lnTest',
      username: `${crypto.randomBytes(8).toString('hex')}testUser`,
      email: `${crypto.randomBytes(8).toString('hex')}test@email.com`,
      password: 'testpass123',
      avatar: 'testAvatar',
    };
    testUsername = testUser.username;
    testEmail = testUser.email;
    testPass = testUser.password;

    const response = await request.post('/signup').send(testUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('login with username should return json contains token and status 200', async () => {
    const response = await request
      .post('/login')
      .send({ u: testUsername, password: testPass });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('login with email should return json contains token and status 200', async () => {
    const response = await request
      .post('/login')
      .send({ u: testEmail, password: testPass });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
