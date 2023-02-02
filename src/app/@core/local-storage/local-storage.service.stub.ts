import { LocalStorageKeys } from './types';

export function LocalStorageServiceStub(): any {
  return {
    getItem: (_key: LocalStorageKeys): any => null,
    setItem: (_key: LocalStorageKeys, _val: any): void => {},
    removeItem: (_key: LocalStorageKeys): void => {},
  };
}
