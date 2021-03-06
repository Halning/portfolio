import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './@core/core.module';

import { MenuComponent } from './menu/menu.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { FooterComponent } from './footer/footer.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { SharedModule } from './@shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

// Must export the config
// export const firebaseConfig = {
//   apiKey: 'AIzaSyCDt3MxLJfw2jIOnN8eebgmjyLaGYyZpr4',
//   authDomain: 'portfolio-2a12b.firebaseapp.com',
//   databaseURL: 'https://portfolio-2a12b.firebaseio.com',
//   projectId: 'portfolio-2a12b',
//   storageBucket: 'portfolio-2a12b.appspot.com',
//   messagingSenderId: '604580569158'
// };

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxWebstorageModule.forRoot({ prefix: 'hal', separator: '.' }),
    AppRoutingModule,
    CoreModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    AboutMeComponent,
    FooterComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    PageNotFoundComponent
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule {}
