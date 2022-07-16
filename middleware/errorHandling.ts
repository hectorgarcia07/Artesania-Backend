import { ErrorRequestHandler, RequestHandler } from 'express';

const errorHandling:ErrorRequestHandler = (err, req, res, next) => {
  console.log("MIDDLE WARE", err.message);
  console.log('Headers: ', req.headers['content-type'])
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return res.status(400).json({error: err.message});
  
  next(err);
};

const unknownEndpoint:RequestHandler = (_req, res) => {
  res.send(404).send({error: 'Unknown endpont'})
}

export default {
  errorHandling,
  unknownEndpoint
};