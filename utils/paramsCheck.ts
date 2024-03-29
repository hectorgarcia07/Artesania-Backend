import { Shoe, Gender, Size, Age } from '../types/shoe';
import { isString, isNumber } from './checkDataType';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const paramsCheck = (obj: any):Shoe => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newShoeObj:Shoe = {
    url: isUrl(obj.url),
    name: isName(obj.name),
    color: isColor(obj.color),
    price: isPrice(obj.price),
    gender: isGender(obj.gender),
    age: isAge(obj.age),
    sizes: isValidSizeArray(obj.sizes),
  };
  
  return newShoeObj;
};

const isValidSizeArray = (sizes:unknown):Size[] => {
  if(!Array.isArray(sizes)){
    throw new Error('No Size was provided');
  }
  if(!sizes.every(size => isValidSizeObj(size))){
    throw new Error('Error in the size/quantity format');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newSize:Size[] = sizes;
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
    throw new Error("Gender must be male, female, unisex");
  }
  return gender;
};

const checkIsValidGender = (gender:string):gender is Gender => {
  return (Object.values(Gender) as string[]).includes(gender);
};

const isAge = (age:unknown):Age => {
  if(!age || !isString(age) || !checkIsValidAge(age)){
    throw new Error("Age must be adult, kid");
  }
  return age;
};

const checkIsValidAge = (age:string): age is Age => {
  return (Object.values(Age) as string[]).includes(age);
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

const isName = (name:unknown):string => {
  if(!name || !isString(name)){
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isUrl = (url:unknown):string => {
  if(!url || !isString(url)){
    throw new Error('Incorrect or missing URL');
  }
  return url;
};

export default paramsCheck;