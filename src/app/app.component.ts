import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { from } from 'rxjs';
import { TypeGuard } from '@port/my-awesome-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'port';

  ngOnInit(): void {
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
