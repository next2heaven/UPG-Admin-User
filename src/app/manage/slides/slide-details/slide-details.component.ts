import { SlideComponent } from './../slide/slide.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bgLayer } from './../../../shared/models/manage/slides';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slide-details',
  templateUrl: './slide-details.component.html',
  styleUrls: ['./slide-details.component.scss']
})
export class SlideDetailsComponent implements OnInit {
  @Input() layer:bgLayer;
  myForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private slideComp:SlideComponent
    ) { }

  ngOnInit() {
    let text_val = (this.layer.text>'')?this.layer.text:'Default Text';

    this.myForm = this.fb.group({
      layer_name: [this.layer.layer_name, [
        Validators.required,
        Validators.minLength(2)
      ]],
      img_url:[this.layer.img_url],
      text:[text_val, [
        Validators.required,
        Validators.minLength(2)
      ]]
    });

    
    this.myForm.valueChanges.subscribe(val => {
      this.updateLayer(val);
    });    
  }

  // Getters
	get layer_name(){ return this.myForm.get('layer_name'); }
	get img_url(){ return this.myForm.get('img_url'); }
	get text(){ return this.myForm.get('text'); }




  clickedDone(event):void {
    event.preventDefault();
    this.slideComp.backToLayers();
  }



  updateLayer(val):void {
    this.slideComp.settings.layers[this.slideComp.cur_layer].layer_name = val.layer_name;
    this.slideComp.settings.layers[this.slideComp.cur_layer].img_url = val.img_url;
    this.slideComp.settings.layers[this.slideComp.cur_layer].text = val.text;
  }
}
