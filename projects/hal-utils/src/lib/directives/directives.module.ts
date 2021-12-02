import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementRefDirective } from './element-ref.directive';
import { LetDirective } from './let.directive';
import { NgIfAugmentedDirective } from './ng-if-augmented.directive';
import { RepeatTimesDirective } from './repeat-times.directive';
import { StickyDirective } from './sticky.directive';
import { ThemeDirective } from './theme.directive';

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
