import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';
import { TooltipDirective } from '@quant-hub/shared';
import { fakeAsync } from '@angular/core/testing';

describe('Shared :: Directives :: TooltipDirective', () => {
  let spectator: SpectatorDirective<TooltipDirective>;
  const createDirective = createDirectiveFactory({
    directive: TooltipDirective,
    providers: [{ provide: 'Window', useValue: window }]
  });

  beforeEach(() => {
    spectator = createDirective(`<div tooltip='SomeTooltipText' delay='100'></div>`);
  });

  afterEach(fakeAsync(() => {
    spectator.dispatchMouseEvent(spectator.element, 'mouseleave');
    spectator.tick(100);
  }));

  it('should get the instance', () => {
    const instance = spectator.directive;
    expect(instance).toBeDefined();
  });

  it('should render tooltip element with proper texts', () => {
    spectator.dispatchMouseEvent(spectator.element, 'mouseenter');

    const tooltip = spectator.query('.ng-tooltip', { root: true });
    expect(tooltip).toHaveText('SomeTooltipText');
  });

  it('should remove tooltip element after delay', fakeAsync(() => {
    spectator.dispatchMouseEvent(spectator.element, 'mouseenter');
    spectator.dispatchMouseEvent(spectator.element, 'mouseleave');

    spectator.tick(spectator.directive.delay + 1);

    const tooltip = spectator.query('.ng-tooltip', { root: true });
    expect(tooltip).not.toExist();
  }));

  describe('#Position', () => {
    it('should be position "above" by default', () => {
      spectator.dispatchMouseEvent(spectator.element, 'mouseenter');

      const tooltip = spectator.query('.ng-tooltip', { root: true });
      expect(tooltip).toHaveClass('ng-tooltip-above');
    });

    it('should be position "below" by default', () => {
      spectator.setInput('position', 'below');

      spectator.dispatchMouseEvent(spectator.element, 'mouseenter');

      const tooltip = spectator.query('.ng-tooltip', { root: true });
      expect(tooltip).toHaveClass('ng-tooltip-below');
    });

    it('should be position "left" by default', () => {
      spectator.setInput('position', 'left');

      spectator.dispatchMouseEvent(spectator.element, 'mouseenter');

      const tooltip = spectator.query('.ng-tooltip', { root: true });
      expect(tooltip).toHaveClass('ng-tooltip-left');
    });

    it('should be position "right" by default', () => {
      spectator.setInput('position', 'right');

      spectator.dispatchMouseEvent(spectator.element, 'mouseenter');

      const tooltip = spectator.query('.ng-tooltip', { root: true });
      expect(tooltip).toHaveClass('ng-tooltip-right');
    });
  });
});
