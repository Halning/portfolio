import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ha-footer',
  template: `
    <div class="footer container">
      This site was created on Angular<br />
      This is a Progressive Web Application
      <p>2017 © Kyiv</p>
    </div>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
