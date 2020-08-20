import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class HaLoaderService {
  loaderEmitter = new EventEmitter<any>();
  isShowLoader = false;

  showLoader(): void {
    this.isShowLoader = true;
    this.loaderEventEmit();
  }

  hideLoader(): void {
    this.isShowLoader = false;
    this.loaderEventEmit();
  }

  loaderEventEmit(): void {
    this.loaderEmitter.emit(this.isShowLoader);
  }
}
