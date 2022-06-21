import { ErrorRequestHandler } from 'express';

const errorHandling:ErrorRequestHandler = (err, _req, res, next) => {
  console.log("MIDDLE WARE", err.message);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return res.status(400).json({error: err.message});
  
  next(err);
};

export default {
  errorHandling
};