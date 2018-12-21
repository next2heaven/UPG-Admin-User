import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidePropsComponent } from './slide-props.component';

describe('SlidePropsComponent', () => {
  let component: SlidePropsComponent;
  let fixture: ComponentFixture<SlidePropsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidePropsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidePropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
