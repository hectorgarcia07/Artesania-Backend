/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import ShoeModel from '../models/shoes';
import paramsCheck from '../utils/paramsCheck';
import passport from "passport";
import express from 'express';
import {Shoe} from '../types/shoe';
import { Role } from '../types/user'
import shoeServices from '../services/shoeServices';
import multer from 'multer'
import { sharpify, uploadToAWS } from '../services/ImageProccess'
import config from '../utils/config'
import { checkRole } from '../services/userServices'

const Router = express.Router();
const authenticate = passport.authenticate('jwt',{session: false})
const MulterMiddleware = multer().single("shoe_image")

// eslint-disable-next-line @typescript-eslint/no-misused-promises
Router.get('/', authenticate, async(_req, res) => {
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
Router.put('/:id', authenticate, checkRole(Role.ADMIN), async(req, res) => {
  const id:string = req.params.id;
  const shoesObj:Shoe = paramsCheck(req.body);
  const updatedShoe = await shoeServices.updateNewShoe(id, shoesObj);
  console.log('AFTERUPDATE', updatedShoe);
  res.status(200).json(updatedShoe);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
Router.delete('/:id', authenticate, checkRole(Role.ADMIN), async(req, res) => {
  console.log("Deleting ", req.params.id)
  const id:string = req.params.id;
  await shoeServices.deleteShoe(id);
  res.status(204).end();
});

Router.post('/img', authenticate, MulterMiddleware, checkRole(Role.ADMIN), async (req, res) => {
  console.log("USER ", req.user)
  try {
    console.log('in IMG request')
    if(!req.file){
      throw new Error('No file was provided.')
    }
    else{
      console.log("About to sharpify")
      const file = req.file
      const newFile = await sharpify(file)

      const result = await uploadToAWS({
        Body: newFile,
        ACL: 'public-read',
        Bucket: config.BUCKETNAME!,
        ContentType: file.mimetype,
        Key: `${file.originalname}`
      })
      let link = `${config.AWSCLOUDFRONT}/${(result as any).Key}`
      console.log("Link ", link)
      return res.status(201).json({ success: true, link })
    }
  } catch (err) {
    if(err instanceof Error)
      return res.json({ success: false, error: err.message })
    return res.json({success: false, error: "Error uploading!"})
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
Router.post('/', authenticate, checkRole(Role.ADMIN), async (req, res) => {
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
    console.log(err)
    res.status(400).json({error: err});
  }
}); 

export default Router;