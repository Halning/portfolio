import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { MapperPipe } from './mapper.pipe';

@NgModule({
  declarations: [SafePipe, MapperPipe],
  imports: [CommonModule],
  exports: [SafePipe],
})
export class PipesModule {}
