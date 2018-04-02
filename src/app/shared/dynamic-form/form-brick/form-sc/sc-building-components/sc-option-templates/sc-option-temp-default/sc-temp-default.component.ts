import { Component, Injector } from '@angular/core';
import { ScOptionTemplate } from '../sc-option-template';
import { RegisterComponent } from '../../../../../../components-list-map.meta';

@Component({
  selector: 'bo-form-sc-temp-default',
  templateUrl: './sc-temp-default.component.html',
  styleUrls: ['./sc-temp-default.component.scss']
})

@RegisterComponent('form-sc-temp-default')

export class ScTempDefaultComponent extends ScOptionTemplate {

  constructor(injector: Injector) {
    super(injector);
  }
}
