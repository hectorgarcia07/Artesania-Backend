import ShoeModel from '../models/shoes';
import paramsCheck from '../utils/paramsCheck';
import express from 'express';
import {Shoe} from '../types/shoe';
import shoeServices from '../services/shoeServices';

const Router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
Router.get('/', async(_req, res) => {
  const shoes = await ShoeModel.Shoe.find({});
  res.json(shoes);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
Router.get('/:id', async(req, res) => {
  try{
    const id:string = req.params.id;
    const shoes = await shoeServices.getSpecificShoe(id);
    res.json(shoes);
  }catch(e: unknown){
    let err = "Error getting all shoes: ";
    if(e instanceof Error){
      err += e.message;
    }
    res.status(400).json({error: err});
  }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
Router.post('/', async (req, res) => {
  try{
    const shoesObj:Shoe = paramsCheck(req.body);
    const newShoeObj = await shoeServices.addNewShoe(shoesObj);
    console.log('saved', newShoeObj);
    res.status(201).json(newShoeObj);
  }catch(e: unknown){
    let err = "Error posting: ";
    if(e instanceof Error){
      err += e.message;
    }
    res.status(400).json({error: err});
  }
});

//updates the entire object
// eslint-disable-next-line @typescript-eslint/no-misused-promises
Router.put('/:id', async(req, res) => {
  const id:string = req.params.id;
  const shoesObj:Shoe = paramsCheck(req.body);
  console.log("BEFORE UPDATE", shoesObj);
  const updatedShoe = await shoeServices.updateNewShoe(id, shoesObj);
  console.log('AFTERUPDATE', updatedShoe);
  res.json(updatedShoe);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
Router.delete('/:id', async(req, res) => {
  const id:string = req.params.id;
  await shoeServices.deleteShoe(id);
  res.status(204).end();
});

export default Router;