class Hash {
  constructor(bcrypt, saltRounds) {
    this.bcrypt = bcrypt;
    this.saltRounds = parseInt(saltRounds);
  }
  createHash(password, salt) {
    return this.bcrypt.hashSync(password + salt, this.saltRounds);
  }

  compareHash(password, hash, salt) {
    return this.bcrypt.compareSync(password + salt, hash);
  }
  genSalt() {
    return this.bcrypt.genSaltSync(this.saltRounds);
  }
}

module.exports = Hash;
