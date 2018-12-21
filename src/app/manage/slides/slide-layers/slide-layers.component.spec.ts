import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideLayersComponent } from './slide-layers.component';

describe('SlideLayersComponent', () => {
  let component: SlideLayersComponent;
  let fixture: ComponentFixture<SlideLayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideLayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
