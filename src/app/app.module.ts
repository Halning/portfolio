import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { Ng2Webstorage } from 'ng2-webstorage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { MenuComponent } from './menu/menu.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { FooterComponent } from './footer/footer.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HaLoaderComponent } from './shared/ha-loader/ha-loader.component';

// Must export the config
export const firebaseConfig = {
    apiKey: 'AIzaSyCDt3MxLJfw2jIOnN8eebgmjyLaGYyZpr4',
    authDomain: 'portfolio-2a12b.firebaseapp.com',
    databaseURL: 'https://portfolio-2a12b.firebaseio.com',
    projectId: 'portfolio-2a12b',
    storageBucket: 'portfolio-2a12b.appspot.com',
    messagingSenderId: '604580569158'
};

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        SharedModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        }),
        Ng2Webstorage.forRoot({ prefix: 'hal', separator: '.' }),
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
        PageNotFoundComponent,
        HaLoaderComponent
    ],
    providers: [Title],
    bootstrap: [AppComponent]
})
export class AppModule {
}
