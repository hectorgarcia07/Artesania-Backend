import { ErrorRequestHandler } from 'express';

const errorHandling:ErrorRequestHandler = (err, _req, res, next) => {
  console.log(err.message);
  console.log(err.name);

  res.status(400).send({error: `In error handler ${err.message}`});

  next(err);
};

export default {
  errorHandling
};