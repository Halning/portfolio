import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgLetDirective } from './directives/ng-let.directive';
import { LetDirective } from './directives/let.directive';
import { StickyDirective } from './directives/sticky.directive';

@NgModule({
  declarations: [
    NgLetDirective,
    LetDirective,
    StickyDirective
  ],
  imports: [CommonModule],
})
export class SharedModule {}
