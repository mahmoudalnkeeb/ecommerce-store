const pool = require('../../configs/db');
const Auth = require('../auth');
const crypto = require('crypto');
const testAuth = new Auth(pool);

let testUsername;
let testEmail;
describe('test auth model', () => {
  it('signup method should return object contains user_id', async () => {
    const testUser = {
      firstname: 'fnTest',
      lastname: 'lnTest',
      username: `${crypto.randomBytes(8).toString('hex')}_testUser`,
      email: `${crypto.randomBytes(8).toString('hex')}_test@email.com`,
      hashed_pass: 'testpass123',
      avatar: 'testAvatar',
    };
    testUsername = testUser.username;
    testEmail = testUser.email;
    const user = await testAuth.signup(testUser);
    expect(user).toHaveProperty('user_id');
  });
  it('login with username method should return object contains user_id', async () => {
    expect(await testAuth.loginWithEmail(testEmail)).toHaveProperty('user_id');
  });
  it('login with email method should return object contains user_id', async () => {
    expect(await testAuth.loginWithUsername(testUsername)).toHaveProperty(
      'user_id'
    );
  });
});
