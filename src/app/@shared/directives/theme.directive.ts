import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[theme]',
})
export class ThemeDirective {
  @Input()
  theme: Record<string, string> = {};

  @HostBinding('style')
  get style(): string {
    return JSON.stringify(this.theme)
      .replace(/{|}|"/g, '')
      .replace(/,--/g, ';--');
  }
}

// usage

// import { Component } from '@angular/core';
//K
// @Component({
//   selector: 'my-app',
//   templateUrl: './app.component.html',
//   styleUrls: [ './app.component.less' ]
// })
// export class AppComponent  {
//   theme = 'default';
//
//   private readonly themes = {
//     default: {},
//     dark: {
//       '--color-background': '#333',
//       '--color-text': '#fff',
//       '--color-button': '#777',
//     },
//     retrowave: {
//       '--color-background': '#1b1837',
//       '--color-text': '#3eb0ff',
//       '--color-button': 'linear-gradient(45deg, #ce4039, #9836a6, #3d6bb1)',
//       '--color-shadow': '0 0 3px #ff00ff, inset 0 0 2px 1px #ff00ff'
//     }
//   }
//
//   get currentTheme(): Record<string, string> {
//     return this.themes[this.theme];
//   }
// }
