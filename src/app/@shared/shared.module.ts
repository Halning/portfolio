import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgLetDirective } from './directives/ng-let.directive';
import { LetDirective } from './directives/let.directive';

@NgModule({
  declarations: [
    NgLetDirective,
    LetDirective
  ],
  imports: [CommonModule],
})
export class SharedModule {}
