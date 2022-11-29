import { DefaultTFuncReturn, TFunction } from "i18next";

const minNumber: (
  newValue: number,
  t: TFunction,
  minValue: number
) => DefaultTFuncReturn | undefined = (newValue, t, minValue) => {
  return newValue >= minValue
    ? undefined
    : t(
        "validationMinNumber",
        "Value must be higher or equal to {{minValue}}",
        { minValue }
      );
};

const isNumber: (
  newValue: number | undefined,
  t: TFunction
) => DefaultTFuncReturn | undefined = (newValue, t) => {
  return newValue && !isNaN(newValue)
    ? undefined
    : t("validationIsNumber", "Value must be a number");
};

const isInteger: (
  newValue: number | undefined,
  t: TFunction
) => DefaultTFuncReturn | undefined = (newValue, t) => {
  return newValue && Number.isInteger(newValue)
    ? undefined
    : t("validationIsInteger", "Value must be an integer");
};

export { minNumber, isNumber, isInteger };
