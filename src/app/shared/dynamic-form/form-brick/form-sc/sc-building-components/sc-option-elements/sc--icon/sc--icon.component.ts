import { Component, Input } from '@angular/core';
import { RegisterComponent } from '../../../../../../components-list-map.meta';

@Component({
  selector: 'bo-form-sc--icon',
  templateUrl: './sc--icon.component.html',
  styleUrls: ['./sc--icon.component.scss']
})

@RegisterComponent('form-sc__icon')

export class FormScIconComponent {

  @Input() data;

}
