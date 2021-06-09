import { AppComponent } from './app.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockComponent } from 'ng-mocks';
import { MyAwesomeLibComponent } from 'my-awesome-lib';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [MockComponent(MyAwesomeLibComponent)],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });

  it(`should have as title 'port'`, () => {
    expect(spectator.component.title).toEqual('port');
  });
});
