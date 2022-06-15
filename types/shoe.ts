export interface Shoe {
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

export type Gender = 'male' | 'female' | 'unisex';
export type Age = 'adult' | 'kid';