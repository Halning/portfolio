import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementRefDirective } from '@port/hal-utils/src/lib/directives/element-ref.directive';
import { LetDirective } from '@port/hal-utils/src/lib/directives/let.directive';
import { NgIfAugmentedDirective } from '@port/hal-utils/src/lib/directives/ng-if-augmented.directive';
import { RepeatTimesDirective } from '@port/hal-utils/src/lib/directives/repeat-times.directive';
import { StickyDirective } from '@port/hal-utils/src/lib/directives/sticky.directive';
import { ThemeDirective } from '@port/hal-utils/src/lib/directives/theme.directive';

@NgModule({
  declarations: [
    ElementRefDirective,
    LetDirective,
    NgIfAugmentedDirective,
    RepeatTimesDirective,
    StickyDirective,
    ThemeDirective,
  ],
  imports: [CommonModule],
  exports: [
    ElementRefDirective,
    LetDirective,
    NgIfAugmentedDirective,
    RepeatTimesDirective,
    StickyDirective,
    ThemeDirective,
  ],
})
export class DirectivesModule {}
