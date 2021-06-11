type FalsyType = false | null | undefined | '' | 0;
type NilType = null | undefined;

export class TypeGuard {
  static typedBoolean<ValueType>(
    value: ValueType,
  ): value is Exclude<ValueType, FalsyType> {
    return Boolean(value);
  }

  static isDefined<ValueType>(
    value: ValueType | null | undefined,
  ): value is Exclude<ValueType, NilType> {
    return value != null;
  }
}
