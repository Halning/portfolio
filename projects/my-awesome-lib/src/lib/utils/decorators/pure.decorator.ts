export function Pure<T>(
  _target: Object,
  propertyKey: string,
  { enumerable, value }: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> {
  const original = value;

  return {
    enumerable,
    get(): T {
      let previousArgs: ReadonlyArray<unknown> = [];
      let previousResult: any;

      const patched = (...args: Array<unknown>) => {
        if (
          previousArgs.length === args.length &&
          args.every((arg, index) => arg === previousArgs[index])
        ) {
          return previousResult;
        }

        previousArgs = args;
        previousResult = original(...args);

        return previousResult;
      };

      Object.defineProperty(this, propertyKey, {
        value: patched
      });

      return patched as any;
    }
  };
}

// @Pure
// private filter(items: readonly string[], value: string): readonly string[] {
//   return items.filter(item =>
//     item.toLowerCase().includes(value.toLowerCase())
//   );
// }
