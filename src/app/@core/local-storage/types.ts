export type LocalStorageDataTypes<T> = T extends LocalStorageKeys.TenantId ? string : never;

export enum LocalStorageKeys {
  TenantId = 'tenantId',
}
