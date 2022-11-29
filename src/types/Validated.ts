import { DefaultTFuncReturn, TFunction } from "i18next";

type Validated<T> = {
  value: T;
  errors: DefaultTFuncReturn[];
  validationFunctions: ((
    newValue: T,
    t: TFunction
  ) => DefaultTFuncReturn | undefined)[];
};

export const validate = <T>(field: Validated<T>, newValue: T, t: TFunction) => {
  const errors: DefaultTFuncReturn[] = [];
  field.validationFunctions.forEach((validation) => {
    const error = validation(newValue, t);
    if (error !== undefined) errors.push(error);
  });

  return {
    ...field,
    value: newValue,
    errors,
  };
};

export default Validated;
