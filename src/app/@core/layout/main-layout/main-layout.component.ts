import { Component, computed, effect, signal } from '@angular/core';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import {UserDetailsComponent} from "../user-details/user-details.component";

@Component({
  selector: 'port-main-layout',
  templateUrl: './main-layout.component.html',
  standalone: true,
  imports: [MatButtonToggle, MatButtonToggleGroup, FormsModule, UserDetailsComponent],
})
export class MainLayoutComponent {
  switcher = signal(null);
  switcherView = computed(() => {
    return this.users.find((user) => user.id === this.switcher());
  });

  readonly users = [
    { name: 'Bereshit', id: 1 },
    { name: 'Noach', id: 2 },
    { name: 'Andrii', id: 3 },
    { name: 'Parasha', id: 4 },
  ];

  constructor() {
    effect(() => {
      console.log('MainLayoutComponent initialized', this.switcher());
    });
  }
}
