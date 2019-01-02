import { SlideComponent } from './../slide/slide.component';
import { bgLayer, LayerKeyProps } from './../../../shared/models/manage/slides';
import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-slide-layers',
  templateUrl: './slide-layers.component.html',
  styleUrls: ['./slide-layers.component.scss']
})
export class SlideLayersComponent implements OnInit {
  @Input() layers:bgLayer[];
  dnd_options:any;
  

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



  addLayer(layerType): void {
    let obj:bgLayer = new bgLayer();
    obj.layer_name = "New "+layerType+" Layer";
    obj.type = layerType;
    obj.keyframes.push(new LayerKeyProps());
    
		this.layers.unshift(obj);
    this.editLayer(0);
    this.slideComp.settings.layers = this.layers;

    this.slideComp.addedLayer(this.slideComp.settings.layers[0]);
	}


	editLayer(id):void {
    this.slideComp.cur_layer = id;
  }
  


}
