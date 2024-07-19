import { Component, model } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'port-user-details',
  standalone: true,
  imports: [MatButton],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent {
  parasha = model<any>(null);
}
