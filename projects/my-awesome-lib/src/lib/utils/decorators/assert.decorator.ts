export function assert<T, K extends keyof T>(
  assertion: (input: T[K]) => boolean,
  messsage: string
): PropertyDecorator {
  return (target, key) => {
    Object.defineProperty(target, key, {
      set(this: T, initialValue: T[K]) {
        let currentValue = initialValue;

        Object.defineProperty(this, key, {
          get(): T[K] {
            return currentValue;
          },
          set(this: T, value: T[K]) {
            console.assert(assertion(value), messsage);
            currentValue = value;
          }
        });
      }
    });
  };
}

// usage
// export function validQuantity(
//   quantity: number
// ): boolean {
//   return Number.isInteger(quantity) && quantity >= 0;
// }
//
// @Component({
//   selector: 'awesome',
//   template: `Quantity: {{quantity}}`,
// })
// export class AwesomeComponent  {
//   @Input()
//   @assert(
//     validQuantity,
//     'Quantity must be non-negative integer'
//   )
//   quantity: number = 0;
// }
