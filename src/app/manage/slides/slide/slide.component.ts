import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Power1, Bounce } from 'gsap/all';

declare var TweenMax: any;

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {
  @ViewChild('mushroom') box: ElementRef;

  constructor() { }

  ngOnInit() {
  }
  
  doIt(): void {
    TweenMax.fromTo(this.box.nativeElement, 2, {x: 20}, {x: 440, ease: Power1.easeOut});
    TweenMax.fromTo(this.box.nativeElement, 2, {y: 20}, {y: 440, ease: Bounce.easeOut});
  }
}
