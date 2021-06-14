import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TypeGuard } from '@port/my-awesome-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private title = 'port';
  ggg = 'port';

  private ggggg(): any {}

  ngOnInit() {
    const arrayWithFalsyValues = [1, undefined, 0, 2, '', null];
    from(arrayWithFalsyValues)
      .pipe(filter(TypeGuard.isDefined))
      .subscribe((ggg) => {
        console.log(ggg);
      });

    const arrayWithoutFalsyValues = arrayWithFalsyValues.filter(
      TypeGuard.isDefined,
    );
  }
}
