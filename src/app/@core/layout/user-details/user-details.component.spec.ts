import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let spectator: Spectator<UserDetailsComponent>;
  const createComponent = createComponentFactory(UserDetailsComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
