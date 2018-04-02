import { Component, Input } from '@angular/core';
import { RegisterComponent } from '../../../../../../components-list-map.meta';

@Component({
  selector: 'bo-form-sc--mark',
  templateUrl: './sc--mark.component.html',
  styleUrls: ['./sc--mark.component.scss']
})

@RegisterComponent('form-sc__mark')

export class FormScMarkComponent {

  @Input() data;

}
