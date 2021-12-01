type FalsyType = false | null | undefined | '' | 0;
type NilType = null | undefined;

export const typedBoolean = <ValueType>(
  value: ValueType,
): value is Exclude<ValueType, FalsyType> => {
  return Boolean(value);
};

export const isDefined = <ValueType>(
  value: ValueType | null | undefined,
): value is Exclude<ValueType, NilType> => {
  return value != null;
};
