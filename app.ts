import mongoose from "mongoose";
import express from 'express';
import "express-async-errors";
require('./utils/passport');
import cors from 'cors';
import ShoesRouter from './controllers/shoes';
import UserRouter from "./controllers/users";
import middleware from './middleware/errorHandling';
import path from "path";
import config from './utils/config'
import logger from './utils/loggers'

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI!)
  .then(() => {
    console.log('connected to MongoDB');  
  })
  .catch((error) => {    
    console.log('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/users', UserRouter);
app.use('/api/shoes', ShoesRouter);
app.get('/*', function (_req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(middleware.errorHandling);
app.use(middleware.unknownEndpoint)

export default app