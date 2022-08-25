module.exports = class Token {
  constructor(jwt, jwtSecret) {
    this.jwt = jwt;
    this.jwtSecret = jwtSecret;
  }
  createToken(payload) {
    try {
      return this.jwt.sign(payload, this.jwtSecret, {
        expiresIn: '24h',
      });
    } catch (error) {
      throw error;
    }
  }
  checkToken(token) {
    try {
      return this.jwt.verify(token, this.jwtSecret);
    } catch (error) {
      return false;
    }
  }
  decodeToken(token) {
    try {
      return this.jwt.decode(token);
    } catch (error) {
      throw error;
    }
  }
};
