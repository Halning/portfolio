import { Component, Input } from '@angular/core';
import { RegisterComponent } from '../../../../../../components-list-map.meta';


@Component({
  selector: 'bo-form-sc--subtitle',
  templateUrl: './sc--subtitle.component.html',
  styleUrls: ['./sc--subtitle.component.scss']
})

@RegisterComponent('form-sc__subtitle')

export class FormScSubTitleComponent {

    @Input() data;

}
