const minNumber: (newValue: number, minValue: number) => string | undefined = (
  newValue,
  minValue
) => {
  return newValue >= minValue
    ? undefined
    : `Value must be higher or equal to ${minValue}`;
};

const isNumber: (newValue: number | undefined) => string | undefined = (
  newValue
) => {
  return newValue && !isNaN(newValue) ? undefined : `Value must be a number`;
};

const isInteger: (newValue: number | undefined) => string | undefined = (
  newValue
) => {
  return newValue && Number.isInteger(newValue)
    ? undefined
    : `Value must be an integer`;
};

export { minNumber, isNumber, isInteger };
