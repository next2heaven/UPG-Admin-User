import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideDetailsComponent } from './slide-details.component';

describe('SlideDetailsComponent', () => {
  let component: SlideDetailsComponent;
  let fixture: ComponentFixture<SlideDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
