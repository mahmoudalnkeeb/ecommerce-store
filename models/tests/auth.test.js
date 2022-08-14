const pool = require('../../configs/db');
const Auth = require('../auth');
const testAuth = new Auth(pool);

const testUser = {
  firstname: 'fnTest',
  lastname: 'lnTest',
  username: 'testUser',
  email: 'test@email.com',
  hashed_pass: 'testpass123',
  avatar: 'testAvatar',
};

describe('test auth model', () => {
  test('signup method should return object contains user_id', () => {
    expect(testAuth.signup(testUser));
  });
  test('login with username method should return object contains user_id', () => {
    expect(testAuth.loginWithUsername('testUsername'));
  });
});
