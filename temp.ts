/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from "mongoose";
import express from 'express';
import "express-async-errors";
require('./utils/passport');
import cors from 'cors';
import ShoesRouter from './controllers/shoes';
import middleware from './middleware/errorHandling';
import dotenv from "dotenv";
import UserRouter from "./controllers/users";
import path from "path";

dotenv.config();

const url = process.env.MONGODB_URI!;
const PORT = process.env.PORT || 3003;
const app = express();

/* App Config */
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.use(express.static(path.join(__dirname, 'build')));

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB');  
  })
  .catch((error) => {    
    console.log('error connecting to MongoDB:', error.message);
  });

app.use('/api/users', UserRouter);
app.use('/api/shoes', ShoesRouter);

app.get('/*', function (_req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(middleware.errorHandling);

app.listen(PORT, () => {
  console.log('Listing on port ' + PORT);
});