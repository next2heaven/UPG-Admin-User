import { MediaLibraryComponent } from './../media-library/media-library.component';
import { SlideComponent } from './../slide/slide.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bgLayer } from './../../../shared/models/manage/slides';
import { Component, OnInit, Input, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UcWidgetComponent } from 'ngx-uploadcare-widget';
import { environment } from '../../../../environments/environment';

@Component({
	selector: 'app-slide-details',
	templateUrl: './slide-details.component.html',
	styleUrls: ['./slide-details.component.scss']
})
export class SlideDetailsComponent implements OnInit, OnChanges {
	@ViewChild(UcWidgetComponent) up_care: UcWidgetComponent;
	@Input() layer:bgLayer;
  @Input() device:string;
	myForm:FormGroup;
	presetColors = environment.colorsHex;

	constructor(
		private fb:FormBuilder,
		private slideComp:SlideComponent,
		private modalServ:NgbModal
		) { }

	ngOnInit() {
		this.updateLayerForm();

		
		this.myForm.valueChanges.subscribe(val => {
			this.updateLayer(val);
		});  
	}

	updateLayerForm(){
		let text_val = (this.layer.text>'')?this.layer.text:'Default Text';

		this.myForm = this.fb.group({
			layer_name: [this.layer.layer_name, [
				Validators.required,
				Validators.minLength(2)
			]],
			asset_url:[this.layer.asset_url],
			text:[text_val, [
				Validators.required,
				Validators.minLength(2)
			]],
			color:[this.layer.color],
			bg_color:[this.layer.bg_color],
			anchorX:[this.layer.anchorX],
			anchorY:[this.layer.anchorY],
			width:[this.layer.width],
			height:[this.layer.height],
			fit_screen:[this.layer.fit_screen],
			font:[this.layer.font],
			font_size:[this.layer.font_size],
			onclick:[this.layer.onclick],
			display:[this.layer.display]
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		this.updateLayerForm();
	}

	// Getters
	get layer_name(){ return this.myForm.get('layer_name'); }
	get asset_url(){ return this.myForm.get('asset_url'); }
	get text(){ return this.myForm.get('text'); }




	clickedDone(event):void {
		event.preventDefault();
		this.slideComp.backToLayers();
	}



	openMediaLibrary():void {
		this.modalServ.open(MediaLibraryComponent, {size:'lg'}).result.then((result) => {
			if(result.url>'' && this.slideComp.settings.layers[this.slideComp.cur_layer].type=='sound'){
				this.myForm.patchValue({ 
					asset_url: result.url,
					layer_name:'SOUND: '+result.name
				});
			} else if(result.url>'') {
				this.myForm.patchValue({ asset_url: result.url });
			}
			this.slideComp.updateAniLayer();

		}, (reason) => {
			console.log('reason', reason);
		});
	}


	colorUpdated(val):void{
		this.slideComp.settings.layers[this.slideComp.cur_layer].color = val;
		this.slideComp.updateAniLayer();
	}
	bgColorUpdated(val):void{
		this.slideComp.settings.layers[this.slideComp.cur_layer].bg_color = val;
		this.slideComp.updateAniLayer();
	}


	updateLayer(val:bgLayer):void {
		for(let o in val){
			this.slideComp.settings.layers[this.slideComp.cur_layer][o] = val[o];
		}
		if(this.slideComp.settings.layers[this.slideComp.cur_layer].layer_name==''){
			if(this.layer.type=='text') this.slideComp.settings.layers[this.slideComp.cur_layer].layer_name = "Text: \""+val.text+"\"";
			else this.slideComp.settings.layers[this.slideComp.cur_layer].layer_name = val.layer_name;
		}
		this.slideComp.updateAniLayer();
		
	}

	removeLayer(e):void {
		e.preventDefault();
		if( confirm('Are you sure you want to remove this layer?') ) this.slideComp.removeLayer();
	}

	uploadComplete(e):void {
		this.up_care.reset(true);
	}
}
