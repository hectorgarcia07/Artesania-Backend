export interface Shoe {
  name: string;
  color: string;
  price: number;
  gender: Gender;
  sizes: Array<Size>;
}

export interface Size {
  size: number;
  quantity: number;
}

export type Gender = 'male' | 'female' | 'unisex';