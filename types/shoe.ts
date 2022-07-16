export interface Shoe{
  url: string;
  name: string;
  color: string;
  price: number;
  gender: Gender;
  age: Age;
  sizes: Array<Size>;
}

export interface Size {
  size: number;
  quantity: number;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  UNISEX = 'unisex'
}
export enum Age {
  ADULT = 'adult',
  KID = 'kid'
}