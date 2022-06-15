import { ErrorRequestHandler } from 'express';

const errorHandling:ErrorRequestHandler = (err, _req, res, next) => {
  console.log(err.message);

  return res.status(400).send(err.message);
  
  next(err);
};

export default {
  errorHandling
};