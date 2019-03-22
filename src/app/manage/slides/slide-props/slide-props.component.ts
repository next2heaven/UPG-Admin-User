import { SlideComponent } from './../slide/slide.component';
import { LayerKeyProps, bgLayer } from './../../../shared/models/manage/slides';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { layerOptions } from 'src/app/shared/models/manage/layerOptions';

@Component({
  selector: 'app-slide-props',
  templateUrl: './slide-props.component.html',
  styleUrls: ['./slide-props.component.scss']
})
export class SlidePropsComponent implements OnInit, OnChanges {
  @Input() props:LayerKeyProps;
  @Input() layer:bgLayer;
  @Input() cur_layer:number = -1;
  @Input() cur_keyframe:number = -1;
  @Input() device:string;
  myForm:FormGroup;
  loading:boolean = true;
  layerOpts: layerOptions = new layerOptions();
  easeList:any = this.layerOpts.getList();
  eventsList:any = this.layerOpts.getEventsList();

  constructor(
    private fb:FormBuilder,
    private slideComp:SlideComponent) { }

  ngOnInit() {
    this.resetForm();
    this.loading = false;
  }
	// GETTERs
	get delay(){ return this.myForm.get('delay'); }
	get time(){ return this.myForm.get('time'); }
	get x(){ return this.myForm.get('x'); }
	get y(){ return this.myForm.get('y'); }



  ngOnChanges() {
    this.resetForm();      
  }


  resetForm():void {
    this.myForm = this.fb.group({
			time:[this.props.time],
      delay:[this.props.delay],
      x:[this.props.x],
      y:[this.props.y],
      scaleX:[this.props.scaleX],
      scaleY:[this.props.scaleY],
      alpha:[this.props.alpha],
      rot:[this.props.rot],
      ease:[this.props.ease],
      ending:[this.props.ending],
      event:[this.props.event]
      // anchorX:[this.props.anchorX],
      // anchorY:[this.props.anchorY]
      // transformOrigin:[''],
      // rotation:[''],
      // repeat:[''],
      // easeIn:[''],
      // easeOut:[''],
      // skewX:[''],
      // skewY:['']
    });
    this.myForm.valueChanges.subscribe(val => {
      this.updateLayer(val);
    });
  }


  updateLayer(props):void {
    this.slideComp.updateKeyProps(props);
  }


  doneEditing(e):void {
    e.preventDefault();
    this.slideComp.cur_layer = -1;
    this.slideComp.cur_keyframe = -1;
  }

}
