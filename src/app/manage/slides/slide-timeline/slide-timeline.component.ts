import { SlideComponent } from './../slide/slide.component';
import { bgLayer } from './../../../shared/models/manage/slides';
import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy, OnChanges, SimpleChanges, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-slide-timeline',
  templateUrl: './slide-timeline.component.html',
  styleUrls: ['./slide-timeline.component.scss']
})
export class SlideTimelineComponent implements OnInit, OnChanges, OnDestroy, AfterContentChecked {
  @Input() layers:bgLayer;
  @Input() cur_layer:number;
  @Input() cur_keyframe:number;
  @Input() timeline_time:number;
  @Input() is_paused:boolean = true;
  @Input() timeline_per:number = 0;
  @ViewChild('layer_list') layer_list: ElementRef;
  @ViewChild('timeline_arrow') timeline_arrow: ElementRef;
  @ViewChild('timeline_times') timeline_times: ElementRef;
  @ViewChild('tl_total_time') tl_total_time: ElementRef;

  offsetX:number = 0;
  total_time:number = 120;
  last_time:number = 120;
  time_pos:number = 0;
  layers_height:number = 0;
  time_percent:number = 0;
  timeline_width_px:number = 0;
  time_left:number = -200;
  changeIntv;


  constructor(private slideComp:SlideComponent) { }

  ngOnInit() {
    this.layers_height = this.layer_list.nativeElement.offsetHeight;
    this.changeIntv = setInterval(() => {
      this.layers_height = this.layer_list.nativeElement.offsetHeight;
    }, 500);
  }

  ngAfterContentChecked(){
    this.timeline_width_px = this.timeline_times.nativeElement.offsetWidth;
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
    this.timeline_width_px = this.timeline_times.nativeElement.offsetWidth;
    
    let per = (this.layers[layer_id].keyframes[key_id].delay / this.tl_total_time.nativeElement.value);
    this.update_timeline_per(per);
    this.slideComp.updateTime(this.layers[layer_id].keyframes[key_id].delay);
    this.slideComp.updateTimePlayhead(this.layers[layer_id].keyframes[key_id].delay, per);
  }

  clickPlayPause():void {
    this.slideComp.timeline_paused = !this.is_paused;
  }

  update_timeline_per(time_percent):void {
    this.time_pos = this.timeline_times.nativeElement.offsetWidth*time_percent;
  }


  addKey():void {
    this.slideComp.addKey(this.time_percent * this.total_time);
  }

  deleteKey():void {
    this.slideComp.deleteKey(this.time_percent * this.total_time);
  }

  updateCurLayer(i):void {
    this.slideComp.updateKeyframe(i, -1);
  }

  updateTotalTime(v):void {
    this.tl_total_time = v;
    this.slideComp.updateTotalTime(v);
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
    this.slideComp.updateTimePlayhead(this.total_time*this.time_percent, this.time_percent);
  }
}
