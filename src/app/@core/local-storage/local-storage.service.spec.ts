import { TestBed } from '@angular/core/testing';

import { getWindowStub } from '@aw-practitioner-profile-client/testing';

import { LocalStorageService } from './local-storage.service';
import { LocalStorageKeys } from './types';
import { WINDOW } from '../../shared/constants';

describe('LocalStorage', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: WINDOW, useValue: getWindowStub() }],
    });
    service = TestBed.inject(LocalStorageService);
  });

  it('should return NULL when trying to get not existing value', () => {
    const getItemSpy = jest.spyOn(service.storage, 'getItem').mockReturnValue(null);

    const data = service.getItem(LocalStorageKeys.Lang);

    expect(data).toBeNull();
    expect(getItemSpy).toBeCalledTimes(1);
    expect(getItemSpy).toBeCalledWith(LocalStorageKeys.Lang);
  });

  it('should return NULL when trying to get not value with exceeded ttl', () => {
    const mockItemValue = JSON.stringify({ val: 'en', ttl: Date.now() - 1 });
    const getItemSpy = jest.spyOn(service.storage, 'getItem').mockReturnValue(mockItemValue);
    const data = service.getItem(LocalStorageKeys.Lang);

    expect(data).toBeNull();
    expect(getItemSpy).toBeCalledTimes(1);
    expect(getItemSpy).toBeCalledWith(LocalStorageKeys.Lang);
  });

  it('should return successfully get data from localStorage with valid ttl', () => {
    const mockValue = 'en';
    const ttl = Date.now() + 10000;
    const mockItemValue = JSON.stringify({ val: mockValue, ttl });
    const getItemSpy = jest.spyOn(service.storage, 'getItem').mockReturnValue(mockItemValue);
    const data = service.getItem(LocalStorageKeys.Lang);

    expect(data).toBe(mockValue);
    expect(getItemSpy).toBeCalledTimes(1);
    expect(getItemSpy).toBeCalledWith(LocalStorageKeys.Lang);
  });

  it('should successfully get data from localStorage', () => {
    const mockItemValue = JSON.stringify({ val: Locales.en });
    const getItemSpy = jest.spyOn(service.storage, 'getItem').mockReturnValue(mockItemValue);

    const data = service.getItem(LocalStorageKeys.Lang);

    expect(data).toEqual(Locales.en);
    expect(getItemSpy).toBeCalledTimes(1);
    expect(getItemSpy).toBeCalledWith(LocalStorageKeys.Lang);
  });

  it('should set value in localStorage', () => {
    const value = 'Locales.en';
    const expectedItemToStore = JSON.stringify({ val: value });
    const setItemSpy = jest.spyOn(service.storage, 'setItem');

    service.setItem(LocalStorageKeys.Lang, value);

    expect(setItemSpy).toBeCalledTimes(1);
    expect(setItemSpy).toBeCalledWith(LocalStorageKeys.Lang, expectedItemToStore);
  });

  it('should set value in localStorage with ttl', () => {
    const ttl = Date.now() + 10000;
    const value = Locales.en;
    const expectedItemToStore = JSON.stringify({ val: value, ttl });
    const setItemSpy = jest.spyOn(service.storage, 'setItem');

    service.setItem(LocalStorageKeys.Lang, value, ttl);

    expect(setItemSpy).toBeCalledTimes(1);
    expect(setItemSpy).toBeCalledWith(LocalStorageKeys.Lang, expectedItemToStore);
  });

  it('should remove value by key in localStorage', () => {
    const removeItemSpy = jest.spyOn(service.storage, 'removeItem');

    service.removeItem(LocalStorageKeys.Lang);

    expect(removeItemSpy).toBeCalledTimes(1);
    expect(removeItemSpy).toBeCalledWith(LocalStorageKeys.Lang);
  });
});
