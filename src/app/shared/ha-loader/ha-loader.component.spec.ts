import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaLoaderComponent } from './ha-loader.component';

describe('HaLoaderComponent', () => {
  let component: HaLoaderComponent;
  let fixture: ComponentFixture<HaLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
