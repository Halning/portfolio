import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  NgZone,
  OnInit,
} from '@angular/core';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { zonefree, zonefull } from '@port/hal-utils';
import { isDefined } from '@port/hal-utils';

@Component({
  selector: 'port-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class AppComponent implements OnInit {
  title = 'port';

  constructor(@Inject(NgZone) private readonly zone: NgZone) {}

  ngOnInit() {
    const arrayWithFalsyValues = [1, undefined, 0, 2, '', null];
    from(arrayWithFalsyValues)
      .pipe(
        zonefree(this.zone),
        filter(isDefined),
        zonefull(this.zone),
        untilDestroyed(this),
      )
      .subscribe((ggg) => {
        console.log(ggg);
      });

    // const arrayWithoutFalsyValues = arrayWithFalsyValues.filter(isDefined);
  }
}
