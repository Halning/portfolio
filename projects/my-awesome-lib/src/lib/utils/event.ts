// Typing for Event with particular currentTarget
import { fromEvent } from 'rxjs';
import { Observable } from 'rxjs';
// eslint-disable-next-line rxjs/no-internal
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';

export type EventWith<E extends Event, T extends FromEventTarget<E>> = E & {
  readonly currentTarget: T;
};

// Typing for RxJs function fromEvent
export function typedFromEvent<
  E extends keyof GlobalEventHandlersEventMap,
  T extends FromEventTarget<EventWith<GlobalEventHandlersEventMap[E], T>>,
>(
  target: T,
  event: E,
  options: AddEventListenerOptions = {},
): Observable<EventWith<GlobalEventHandlersEventMap[E], T>> {
  return fromEvent(target, event, options);
}

// usage
// typedFromEvent(nativeElement, 'click').subscribe(event => {
//   // event is MouseEvent, target is HTMLElement
//   event.currentTarget.focus();
// });
