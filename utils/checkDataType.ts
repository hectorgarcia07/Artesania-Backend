export const isString = (str:any): str is string => {
  return typeof str === 'string' || str instanceof String;
};

export const isNumber = (num:any): num is number => {
  return typeof num === 'number';
};

