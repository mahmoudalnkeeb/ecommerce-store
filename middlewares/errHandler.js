module.exports = function errHandler(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  let error, inputs, code;

  switch (err.code) {
    case '23505':
      error = 'some data you entered is invalid';
      code = 400;
      inputs = err.constraint.split('_')[1];
      break;
    default:
      error = 'Something went wrong';
      code = err.status;
      break;
  }
  console.log(err);
  res.status(code || 500);
  res.json({
    error,
    inputs,
  });
};
