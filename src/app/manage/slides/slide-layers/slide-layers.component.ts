import { SlideComponent } from './../slide/slide.component';
import { bgLayer, LayerKeyProps } from './../../../shared/models/manage/slides';
import { Component, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-slide-layers',
  templateUrl: './slide-layers.component.html',
  styleUrls: ['./slide-layers.component.scss']
})
export class SlideLayersComponent implements OnInit, OnChanges {
  @Input() layers:bgLayer[];
  @Input() device:string;
  dnd_options:any;
  allow_import:boolean = false;

  constructor(
    private slideComp:SlideComponent
    ) { 
    this.dnd_options = {
      animation: 250,
      onUpdate: (event: any) => {
        this.slideComp.redrawAnimation();
      }
    };
  }

  ngOnInit() {
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes.layers){
      let allow:boolean = true;
      for(let layer of this.layers){
        if(layer.device=='ss') allow = false;
      }
      if(allow) this.allow_import = true;
    }
  }



  addLayer(layerType): void {
    let obj:bgLayer = new bgLayer();
    obj.layer_name = this.getLayerName(layerType);
    obj.type = layerType;
    obj.device = this.device;
    obj.keyframes.push(new LayerKeyProps());
    
		this.layers.unshift(obj);    
    this.slideComp.settings.layers = this.layers;

    if(layerType!=='event') this.editLayer(0);
    this.slideComp.addedLayer(this.slideComp.settings.layers[0]);
	}


	editLayer(id):void {
    this.slideComp.cur_layer = id;
  }
  

  getLayerName(type:string):string {
    if(type=='event') return "Events Layer";
    else return "New "+type+" Layer";
  }


  importLayers():void {
    for(let layer of this.layers){
      if(layer.device=='ud'){
        let new_layer = { ...layer }
        new_layer.device = 'ss';
        new_layer.keyframes = [new LayerKeyProps()];
        this.layers.push(new_layer);
      }
    }
    this.allow_import = false;
  }
}
