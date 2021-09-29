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

// https://twitter.com/Waterplea/status/1269703365094780928?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1269703365094780928%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Ftype%3Dtext2Fhtmlkey%3Da19fcc184b9711e1b4764040d3dc5c07schema%3Dtwitterurl%3Dhttps3A%2F%2Ftwitter.com%2Fwaterplea%2Fstatus%2F1269703365094780928image%3D
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
