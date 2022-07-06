import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { LoadingService, withLoading } from './loading.service';
import { of } from 'rxjs';

describe('withLoading', () => {
  it('should call "show" method from loader', () => {
    const loadingService = new LoadingService();
    spyOn(loadingService, 'show');
    spyOn(loadingService, 'calculateRequests');
    spyOn(loadingService, 'addRequest');

    of(null)
      .pipe(withLoading(loadingService))
      .subscribe(() => {
        expect(loadingService.show).toBeCalledTimes(1);
        expect(loadingService.calculateRequests).toBeCalledTimes(1);
        expect(loadingService.addRequest).toBeCalledTimes(1);
      });
  });
});

describe('LoadingService', () => {
  let spectator: SpectatorService<LoadingService>;
  const createService = createServiceFactory(LoadingService);

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('#show', () => {
    it('should emit true', () => {
      spectator.service.show();

      spectator.service.loading$.subscribe((res) => {
        expect(res).toBeTruthy();
      });
    });
  });

  describe('#hide', () => {
    it('should emit false', () => {
      spectator.service.hide();

      spectator.service.loading$.subscribe((res) => {
        expect(res).toBeFalsy();
      });
    });
  });

  describe('#calculateRequests', () => {
    it('should hide when all requests have been ended', () => {
      spectator.service.completedRequests = 1;
      spectator.service.totalRequests = 2;

      spectator.service.calculateRequests();

      spectator.service.loading$.subscribe((res) => {
        expect(res).toBeFalsy();
      });
    });

    it('should reset when all requests have been ended', () => {
      spectator.service.completedRequests = 1;
      spectator.service.totalRequests = 2;

      spectator.service.calculateRequests();

      expect(spectator.service.completedRequests).toBe(0);
      expect(spectator.service.totalRequests).toBe(0);
    });
  });
});
