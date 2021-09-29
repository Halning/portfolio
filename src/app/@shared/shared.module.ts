import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgLetDirective } from './directives/ng-let.directive';
import { LetDirective } from './directives/let.directive';
import { StickyDirective } from './directives/sticky.directive';
import { ThemeDirective } from './directives/theme.directive';
import { ElementRefDirective } from './directives/element-ref.directive';
import { RepeatTimesDirective } from './directives/repeat-times.directive';

@NgModule({
  declarations: [
    NgLetDirective,
    LetDirective,
    StickyDirective,
    ThemeDirective,
    ElementRefDirective,
    RepeatTimesDirective
  ],
  imports: [CommonModule],
})
export class SharedModule {}
