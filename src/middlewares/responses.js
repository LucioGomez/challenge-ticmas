exports.succes = (req, res, message = '' , status = 200,body) => {
  res.status(status).send({
    error: false,
    status: status,
    message: message,
    body : body 
  });
};

exports.error = (req, res, message = 'Error intern', status=500) => {
    res.status(status).send({
      error: false,
      status: status,
      message: message,
    });
  };