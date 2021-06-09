import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MyAwesomeLibModule } from 'my-awesome-lib';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MyAwesomeLibModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
