import { inject, Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, shareReplay } from 'rxjs/operators';
import { Position } from 'postcss';


// I saw many developers who created good services in their apps that make one thing well.
//   Because we use RxJS, service can contain one Observable or Subject inside and do some data transformation for it.
                                                                                                                                                                                                        So, you can simplify such situations extending your services from Observable or Subject:
export const GEOLOCATION = new InjectionToken<Geolocation>(
  'An abstraction over window.navigator.geolocation object',
  {
    factory: () => inject(NAVIGATOR).geolocation,
  },
);

export const GEOLOCATION_SUPPORT = new InjectionToken<boolean>(
  'Is Geolocation API supported?',
  {
    factory: () => !!inject(GEOLOCATION),
  },
);

export const POSITION_OPTIONS = new InjectionToken<PositionOptions>(
  'Token for an additional position options',
  { factory: () => ({}) },
);

@Injectable({
  providedIn: 'root',
})
export class GeolocationService extends Observable<Position> {
  constructor(
    @Inject(GEOLOCATION) geolocationRef: Geolocation,
    @Inject(GEOLOCATION_SUPPORT) geolocationSupported: boolean,
    @Inject(POSITION_OPTIONS)
    positionOptions: PositionOptions,
  ) {
    let watchPositionId = 0;

    super((subscriber) => {
      if (!geolocationSupported) {
        subscriber.error('Geolocation is not supported in your browser');
      }

      watchPositionId = geolocationRef.watchPosition(
        (position) => subscriber.next(position),
        (positionError) => subscriber.error(positionError),
        positionOptions,
      );
    });

    return this.pipe(
      finalize(() => geolocationRef.clearWatch(watchPositionId)),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }
}
