import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideAnimationComponent } from './slide-animation.component';

describe('SlideAnimationComponent', () => {
  let component: SlideAnimationComponent;
  let fixture: ComponentFixture<SlideAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
