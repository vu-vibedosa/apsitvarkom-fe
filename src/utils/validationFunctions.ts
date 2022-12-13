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

const maxNumber: (
  newValue: number,
  t: TFunction,
  maxValue: number
) => DefaultTFuncReturn | undefined = (newValue, t, maxValue) => {
  return newValue <= maxValue
    ? undefined
    : t("validationMaxNumber", "Value must be lower or equal to {{maxValue}}", {
        maxValue,
      });
};

const isNumber: (
  newValue: number,
  t: TFunction
) => DefaultTFuncReturn | undefined = (newValue, t) => {
  return !isNaN(newValue)
    ? undefined
    : t("validationIsNumber", "Value must be a number");
};

const isInteger: (
  newValue: number,
  t: TFunction
) => DefaultTFuncReturn | undefined = (newValue, t) => {
  return Number.isInteger(newValue)
    ? undefined
    : t("validationIsInteger", "Value must be an integer");
};

const isRequired: (
  newValue: unknown | undefined,
  t: TFunction
) => DefaultTFuncReturn | undefined = (newValue, t) => {
  return newValue !== undefined
    ? undefined
    : t("validationIsRequired", "Value is required");
};

const isInTheFuture: (
  newValue: Date,
  t: TFunction
) => DefaultTFuncReturn | undefined = (newValue, t) => {
  return newValue.getTime() > new Date().getTime()
    ? undefined
    : t("validationIsInTheFuture", "Date must be in the future");
};

export { minNumber, isNumber, isInteger, isRequired, isInTheFuture, maxNumber };
