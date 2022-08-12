class Hash {
  constructor(bcrypt, saltRounds) {
    this.bcrypt = bcrypt;
    this.saltRounds = parseInt(saltRounds);
    this.salt = this.bcrypt.genSaltSync(this.saltRounds);
  }
  createHash(password) {
    return this.bcrypt.hashSync(password + this.salt, this.saltRounds);
  }

  compareHash(password, hash) {
    return this.bcrypt.compareSync(password + this.salt, hash);
  }
}

module.exports = Hash;
