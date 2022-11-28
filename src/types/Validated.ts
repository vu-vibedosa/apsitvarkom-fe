type Validated<T> = {
  value: T;
  errors: string[];
  validationFunctions: ((newValue: T) => string | undefined)[];
};

export const validate = <T>(field: Validated<T>, newValue: T) => {
  const errors: string[] = [];
  field.validationFunctions.forEach((validation) => {
    const error = validation(newValue);
    if (error !== undefined) errors.push(error);
  });

  return {
    ...field,
    value: newValue,
    errors,
  };
};

export default Validated;
