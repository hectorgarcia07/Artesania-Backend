import {Shoe, Gender, Size} from '../types/shoe';
/*
  {
    name, color, price, gender,
    size: [ { number, quantity } ]
  }
*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const paramsCheck = (obj: any):Shoe => {
  const newShoeObj:Shoe = {
    name: isName(obj.name),
    color: isColor(obj.color),
    price: isPrice(obj.price),
    gender: isGender(obj.gender),
    sizes: isValidSize(obj.size)
  };
  return newShoeObj;
};

const isValidSize = (size:unknown):Size[] => {
  if(!Array.isArray(size)){
    throw new Error('No Size was provided');
  }
  if(!size.every(obj => isValidSizeObj(obj))){
    throw new Error('Error in the size/quantity format');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newSize:Size[] = size;
  return newSize;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidSizeObj = (obj:any):obj is Size => {
  if(!obj || !isNumber(obj.size) || !isNumber(obj.quantity)){
    return false;
  }
  return true;
};

const isGender = (gender:unknown):Gender => {
  if(!gender || !isString(gender) || !checkIsValidGender(gender)){
    throw new Error("Error: gender must be male, female, unisex");
  }
  return gender;
};

const checkIsValidGender = (gender:string):gender is Gender => {
  return ['male', 'female', 'unisex'].includes(gender);
};

const isPrice = (price:unknown):number  =>{
  if(!price || !isNumber(price)){
    throw new Error('Incorrect or missing color');
  }
  return price;
};

const isColor = (name:unknown):string  =>{
  if(!name || !isString(name)){
    throw new Error('Incorrect or missing color');
  }
  return name;
};

const isName = (name:unknown):string  =>{
  if(!name || !isString(name)){
    throw new Error('Incorrect or missing comment');
  }
  return name;
};

const isString = (str:any): str is string => {
  return typeof str === 'string' || str instanceof String;
};

const isNumber = (num:any): num is number => {
  return typeof num === 'number';
};

export default paramsCheck;