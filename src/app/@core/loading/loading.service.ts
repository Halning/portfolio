import { Injectable } from '@angular/core';
import { BehaviorSubject, MonoTypeOperatorFunction } from 'rxjs';
import { finalize } from 'rxjs/operators';

interface Loader {
  totalRequests: number;
  completedRequests: number;
  show(): void;
  hide(): void;
  calculateRequests(): void;
  addRequest(): void;
}

export function withLoading<T, K extends Loader>(
  loader: K,
): MonoTypeOperatorFunction<T> {
  loader.show();
  loader.addRequest();

  return finalize(() => {
    loader.calculateRequests();
  });
}

@Injectable()
export class LoadingService implements Loader {
  private _loading = new BehaviorSubject<boolean>(false);
  // eslint-disable-next-line no-invalid-this
  readonly loading$ = this._loading.asObservable();

  totalRequests = 0;
  completedRequests = 0;

  show() {
    this._loading.next(true);
  }

  hide() {
    this._loading.next(false);
  }

  calculateRequests(): void {
    this.completedRequests++;

    console.log(this.completedRequests, this.totalRequests);

    if (this.completedRequests === this.totalRequests) {
      this.hide();
      this.resetRequests();
    }
  }

  addRequest(): void {
    this.totalRequests++;
  }

  private resetRequests(): void {
    this.completedRequests = 0;
    this.totalRequests = 0;
  }
}
