/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from "mongoose";
import loginRouter from "./controllers/login";
import express from 'express';
import cors from 'cors';
import ShoesRouter from './controllers/shoes';
import middleware from './utils/middleware';
import dotenv from "dotenv";
import UserRouter from "./controllers/users";
require('express-async-errors');
dotenv.config();

const url = process.env.MONGODB_URI!;
const PORT = process.env.PORT || 3003;
const app = express();

/* App Config */
app.use(cors());
app.use(express.json());


// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.use(express.static(__dirname + '/public/build/'));

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB');  
  })
  .catch((error) => {    
    console.log('error connecting to MongoDB:', error.message);
  });

app.use('/api/users', UserRouter);
app.use('/api/login', loginRouter);
app.use('/api/shoes', ShoesRouter);
app.use(middleware.errorHandling);

app.listen(PORT, () => {
  console.log('Listing on port ' + PORT);
});