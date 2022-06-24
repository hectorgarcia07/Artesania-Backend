/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import ShoeModel from '../models/shoes';
import paramsCheck from '../utils/paramsCheck';
import passport from "passport";
import express from 'express';
import {Shoe} from '../types/shoe';
import shoeServices from '../services/shoeServices';
import upload from '../services/imageUpload';

const Router = express.Router();
const authenticate = passport.authenticate('jwt',{session: false})
const uploadMiddleware = upload.single("shoe_image")

// eslint-disable-next-line @typescript-eslint/no-misused-promises
Router.get('/', async(_req, res) => {
  const shoes = await ShoeModel.Shoe.find({});
  res.json(shoes);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
Router.get('/:id', authenticate, async(req, res) => {
  console.log("GETSSSSSSSSSSSSss");
  try{
    console.log(req.user);
    const id:string = req.params.id;
    const shoes = await shoeServices.getSpecificShoe(id);
    res.json(shoes);
  }catch(e: unknown){
    let err = "Error getting specific shoe. ";
    if(e instanceof Error){
      err += e.message;
    }
    res.status(400).json({error: err});
  }
});

//updates the entire object
// eslint-disable-next-line @typescript-eslint/no-misused-promises
Router.put('/:id', authenticate, async(req, res) => {
  const id:string = req.params.id;
  const shoesObj:Shoe = paramsCheck(req.body);
  const updatedShoe = await shoeServices.updateNewShoe(id, shoesObj);
  console.log('AFTERUPDATE', updatedShoe);
  res.json(updatedShoe);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
Router.delete('/:id', passport.authenticate('jwt',{session: false}), async(req, res) => {
  const id:string = req.params.id;
  await shoeServices.deleteShoe(id);
  res.status(204).end();
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
Router.post('/img', authenticate, uploadMiddleware, async (req,res) => {
  try{
    await console.log("In img route")
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const update = req?.file;
    const link = (update as any).location
    console.log('update', (update as any).location);
    console.log("BODY", req.body);
    console.log("FILE", req.file)
    return res.status(200).json({success: 'success', link});
  }catch(e: unknown){
    console.log('In catch');
    let err = '';
    if(e instanceof Error){
      err += e.message;
    }
    throw new Error(err);
  }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
Router.post('/', authenticate, async (req, res) => {
  try{
    const shoesObj:Shoe = paramsCheck(req.body);
    console.log("SAVING TO DB");
    const newShoeObj = await shoeServices.addNewShoe(shoesObj);
    console.log('saved', newShoeObj);
    res.status(201).json(newShoeObj);
  }catch(e: unknown){
    let err = "Error posting: ";
    if(e instanceof Error){
      err += e.message;
    }
    console.log(err)
    res.status(400).json({error: err});
  }
}); 

export default Router;