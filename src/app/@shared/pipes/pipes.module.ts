import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { MapperPipe } from './mapper.pipe';

@NgModule({
  declarations: [MapperPipe, SafePipe],
  imports: [CommonModule],
  exports: [SafePipe],
})
export class PipesModule {}
