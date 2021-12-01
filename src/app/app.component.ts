import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  NgZone,
  OnInit,
} from '@angular/core';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isDefined, SubSink, zonefree, zonefull } from '@port/my-awesome-lib';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'port-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class AppComponent implements OnInit {
  title = 'port';

  private subscription = new SubSink();

  constructor(@Inject(NgZone) private readonly zone: NgZone) {}

  ngOnInit() {
    // const arrayWithFalsyValues = [1, undefined, 0, 2, '', null];
    // this.subscription.sink = from(arrayWithFalsyValues)
    //   .pipe(
    //     zonefree(this.zone),
    //     filter(isDefined),
    //     zonefull(this.zone),
    //     untilDestroyed(this),
    //   )
    //   .subscribe((ggg) => {
    //     console.log(ggg);
    //   });
    //
    // const arrayWithoutFalsyValues = arrayWithFalsyValues.filter(isDefined);
  }
}
