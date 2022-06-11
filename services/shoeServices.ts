import { Shoe } from '../types/shoe';
import ShoeModel from '../models/shoes';

const addNewShoe = async (shoeObj:Shoe):Promise<Shoe> => {
  try{
    const newShoe = new ShoeModel.Shoe({
      name: shoeObj.name,
      color: shoeObj.color,
      price: shoeObj.price,
      gender: shoeObj.gender,
      sizes: shoeObj.sizes
    });
    const result = await newShoe.save();
    console.log(result);
    return result;
  }catch(e: unknown){
    let message = 'Error saving ';
    if(e instanceof Error){
      message += e.message;
    }
    throw new Error(message);
  }
};

const updateNewShoe = async(id:string, obj:Shoe) => {
  try{
    const updatedShoe = await ShoeModel.Shoe.findByIdAndUpdate(id, obj, { new: true });
    return updatedShoe;
  }catch(e: unknown){
    let err = 'Error updating ';
    if(e instanceof Error){
      err += e.message;
    }
    throw new Error(err);
  }
};

const getSpecificShoe = async(id:string) => {
  try{
    const specificShoe = await ShoeModel.Shoe.findById(id);
    return specificShoe;
  }catch(e: unknown){
    let err = 'Error getting specific shoe ';
    if(e instanceof Error){
      err += e.message;
    }
    throw new Error(err);
  }
};

const deleteShoe = async(id:string) => {
  try{
    await ShoeModel.Shoe.findByIdAndRemove(id);
  }
  catch(e: unknown){
    let err = 'Error getting specific shoe ';
    if(e instanceof Error){
      err += e.message;
    }
    throw new Error(err);
  }
};

export default {
  addNewShoe,
  updateNewShoe,
  getSpecificShoe,
  deleteShoe
};