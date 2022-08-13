module.exports = class Token {
  constructor(jwt, jwtSecret) {
    this.jwt = jwt;
    this.jwtSecret = jwtSecret;
  }
  createToken(payload) {
    return this.jwt.sign(payload, this.jwtSecret, {
      expiresIn: '24h',
      algorithm: 'RS256',
    });
  }
  checkToken(token) {
    return this.jwt.verify(token, this.jwtSecret);
  }
  decodeToken(token) {
    return this.jwt.decode;
  }
};
