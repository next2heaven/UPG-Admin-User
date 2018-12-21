import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideTimelineComponent } from './slide-timeline.component';

describe('SlideTimelineComponent', () => {
  let component: SlideTimelineComponent;
  let fixture: ComponentFixture<SlideTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
