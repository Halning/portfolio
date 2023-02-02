import { Inject, Injectable, InjectionToken } from '@angular/core';

import { LocalStorageDataTypes, LocalStorageKeys } from './types';
export const WINDOW = new InjectionToken<Window>('Window');

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  storage?: Storage;

  constructor(@Inject(WINDOW) private readonly win: Window) {
    if (typeof this.win !== 'undefined' && 'localStorage' in this.win) {
      this.storage = this.win.localStorage;
    }
  }

  getItem<T extends LocalStorageKeys>(key: T): LocalStorageDataTypes<T> | null {
    if (!this.storage) {
      return null;
    }

    const item = this.storage.getItem(key);
    if (item === null) {
      return null;
    }

    try {
      const parsedObj = JSON.parse(item);
      const { val, ttl } = parsedObj;

      if (ttl && ttl < Date.now()) {
        return null;
      }

      return val;
    } catch (e) {
      return null;
    }
  }

  setItem<T extends LocalStorageKeys>(
    key: T,
    val: LocalStorageDataTypes<T>,
    ttl?: number,
  ): void {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify({ val, ttl }));
    }
  }

  removeItem<T extends LocalStorageKeys>(key: T): void {
    if (this.storage) {
      this.storage.removeItem(key);
    }
  }
}
