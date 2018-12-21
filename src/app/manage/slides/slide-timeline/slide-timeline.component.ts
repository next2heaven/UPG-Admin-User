import { SlideComponent } from './../slide/slide.component';
import { bgLayer } from './../../../shared/models/manage/slides';
import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-slide-timeline',
  templateUrl: './slide-timeline.component.html',
  styleUrls: ['./slide-timeline.component.scss']
})
export class SlideTimelineComponent implements OnInit, OnChanges, OnDestroy {
  @Input() layers:bgLayer;
  @Input() cur_layer:number;
  @Input() cur_keyframe:number;
  @Input() timeline_time:number;
  @Input() is_paused:boolean = true;
  @Input() timeline_per:number = 0;
  @ViewChild('layer_list') layer_list: ElementRef;
  @ViewChild('timeline_arrow') timeline_arrow: ElementRef;
  @ViewChild('timeline_times') timeline_times: ElementRef;

  offsetX:number = 0;
  total_time:number = 120;
  last_time:number = 120;
  time_pos:number = 0;
  layers_height:number = 0;
  time_percent:number = 0;
  changeIntv;


  constructor(private slideComp:SlideComponent) { }

  ngOnInit() {
    this.layers_height = this.layer_list.nativeElement.offsetHeight;
    this.changeIntv = setInterval(() => {
      this.layers_height = this.layer_list.nativeElement.offsetHeight;
    }, 500);
  }

  ngOnChanges(changes:SimpleChanges):void {
		if(!this.is_paused && changes.timeline_per){
      this.update_timeline_per(this.timeline_per);
    }
  }

  ngOnDestroy(){
    clearInterval(this.changeIntv);
  }



  editKey(layer_id, key_id):void {
    this.slideComp.updateKeyframe(layer_id, key_id);
  }

  clickPlayPause():void {
    this.slideComp.timeline_paused = !this.is_paused;
  }

  update_timeline_per(time_percent):void {
    this.time_pos = this.timeline_times.nativeElement.offsetWidth*time_percent;
  }






  dragStart(event){
    this.offsetX = this.timeline_arrow.nativeElement.offsetLeft;
  }

  dragEnd(event){

  }
  
  draggingTime(event) {
    let posX:number = event.x + this.offsetX;
    if(posX<0) posX = 0;
    else if(posX>this.timeline_times.nativeElement.offsetWidth) posX = this.timeline_times.nativeElement.offsetWidth;
    this.time_pos = posX;

    this.time_percent = (posX/this.timeline_times.nativeElement.offsetWidth);
    this.slideComp.updateTimePlayhead(this.total_time*this.time_percent);
  }
}
