import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from './directives/let.directive';
import { StickyDirective } from './directives/sticky.directive';
import { ThemeDirective } from './directives/theme.directive';
import { ElementRefDirective } from './directives/element-ref.directive';
import { RepeatTimesDirective } from './directives/repeat-times.directive';
import { NgIfAugmentedDirective } from './directives/ng-if-augmented.directive';

@NgModule({
  declarations: [
    ElementRefDirective,
    LetDirective,
    LetDirective,
    NgIfAugmentedDirective,
    RepeatTimesDirective,
    StickyDirective,
    ThemeDirective,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
