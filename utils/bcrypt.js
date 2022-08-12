class Hash {
  constructor(bcrypt, saltRounds, salt) {
    this.bcrypt = bcrypt;
    this.saltRounds = parseInt(saltRounds);
    this.salt = salt;
  }
  createHash(password) {
    return this.bcrypt.hashSync(password + this.salt, this.saltRounds);
  }

  compareHash(password, hash) {
    return this.bcrypt.compareSync(password + this.salt, hash);
  }
}

module.exports = Hash;
