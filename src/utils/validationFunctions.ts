const minNumber: (newValue: number, minValue: number) => string | undefined = (
  newValue,
  minValue
) => {
  return newValue >= minValue
    ? undefined
    : `Value must be higher or equal to ${minValue}`;
};

const isNumber: (newValue: number) => string | undefined = (newValue) => {
  return !isNaN(newValue) ? undefined : `Value must be a number`;
};

export { minNumber, isNumber };
