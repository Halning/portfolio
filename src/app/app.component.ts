import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';
// import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'ha-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  showFooter = true;
  // private _messaging: firebase.messaging.Messaging;

  constructor(
    private router: Router,
    // private af: AngularFirestore,
    private translate: TranslateService,
    private localSt: LocalStorageService
  ) {
    // this.items = af.collection('/item').valueChanges();
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.setLanguage();
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showFooter = event.url !== '/home';
      }
    });
  }

  private setLanguage(): void {
    const curLang = this.localSt.retrieve('language');

    if (!curLang) {
      this.localSt.store('language', 'en');
    }
  }
}
