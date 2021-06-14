import { isEmpty } from 'lodash-es';

export function mapToArrayWithType<T, U = T>(
  constructor: new (options: Partial<U>) => T,
  items: U[],
): T[] {
  return isEmpty(items) ? [] : items.map((item: U) => new constructor(item));
}
