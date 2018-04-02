import { Component, Input } from '@angular/core';
import { RegisterComponent } from '../../../../../../components-list-map.meta';

@Component({
    selector: 'bo-form-sc--stats',
    templateUrl: './sc--stats.component.html',
    styleUrls: ['./sc--stats.component.scss']
})

@RegisterComponent('form-sc__stats')

export class FormScStatsComponent {

    @Input() data;

}
