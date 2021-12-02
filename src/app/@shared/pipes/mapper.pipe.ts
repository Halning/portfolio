import { Pipe, PipeTransform } from '@angular/core';

export type Mapper<T, G> = (item: T, ...args: any[]) => G;

@Pipe({ name: 'mapper' })
export class MapperPipe<T, G> implements PipeTransform {
  transform(value: T, mapper: Mapper<T, G>, ...args: any[]): G {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return mapper(value, ...args);
  }
}

//usage
// <p>
//   Capped value: {{value | mapper : capValue : max}}
// </p>

// @Component({
//   selector: 'my-app',
//   templateUrl: './app.component.html',
//   styleUrls: [ './app.component.css' ],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class AppComponent  {
//   readonly value = 125;
//   readonly max = 100;
//
//   readonly capValue: Mapper<number, number> =
//     (value: number, max: number) => Math.min(value, max);
// }
