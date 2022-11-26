type Validated<T> = {
  value: T;
  errors?: string[];
  validationFunctions: ((newValue: T) => string | undefined)[];
};

export default Validated;
