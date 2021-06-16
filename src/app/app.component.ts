import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isDefined, SubSink } from '@port/my-awesome-lib';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'port-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class AppComponent implements OnInit {
  ggg = 'port';
  private title = 'port';

  private subscription = new SubSink();

  ngOnInit() {
    const arrayWithFalsyValues = [1, undefined, 0, 2, '', null];
    this.subscription.sink = from(arrayWithFalsyValues)
      .pipe(filter(isDefined), untilDestroyed(this))
      .subscribe((ggg) => {
        console.log(ggg);
      });

    const arrayWithoutFalsyValues = arrayWithFalsyValues.filter(isDefined);
  }
}
