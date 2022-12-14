module.exports = {
  validateSignup(req, res, next) {
    let invalid = [];
    let nulls = [];
    let { firstname, lastname, username, email, password, avatar } = req.body;
    if (!firstname) nulls.push('firstname');
    if (!lastname) nulls.push('firstname');
    if (!username) nulls.push('firstname');
    if (!email) nulls.push('email');
    if (!password) nulls.push('firstname');
    if (!checkPass(password)) invalid.push('password');
    if (email) {
      if (!checkEmail(email)) invalid.push('email');
    }
    if (!avatar) avatar = 'default:avatar';
    if (invalid.length != 0 || nulls.length != 0)
      return res.status(400).json({ nulls, invalid });

    req.userData = {
      firstname,
      lastname,
      username,
      email,
      password,
      avatar,
    };
    next();
  },
  validateLogin(req, res, next) {
    const { u } = req.body;
    if (!checkEmail(u)) {
      req.isEmail = false;
      return next();
    }
    req.isEmail = true;
    next();
  },
};

function checkEmail(email) {
  const emailReg = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  if (!emailReg.test(email)) return false;
  return true;
}
function checkPass(pass) {
  const passReg = RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  );
  if (!passReg.test(pass)) return false;
  return true;
}
