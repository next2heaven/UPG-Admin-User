import { MediaLibraryComponent } from './../media-library/media-library.component';
import { SlideComponent } from './../slide/slide.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bgLayer } from './../../../shared/models/manage/slides';
import { Component, OnInit, Input } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
		private slideComp:SlideComponent,
		private modalServ:NgbModal
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
			]],
			anchorX:[this.layer.anchorX],
			anchorY:[this.layer.anchorY],
			font:[this.layer.font],
			font_size:[this.layer.font_size]
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



	openMediaLibrary():void {
		this.modalServ.open(MediaLibraryComponent, {size:'lg'}).result.then((result) => {
			if(result>'') this.slideComp.settings.layers[this.slideComp.cur_layer].img_url = result;
			this.slideComp.updateAniLayer();

		}, (reason) => {
			console.log('reason', reason);
		});
	}


	colorUpdated(val):void{
		this.slideComp.settings.layers[this.slideComp.cur_layer].color = val;
		this.slideComp.updateAniLayer();
	}


	updateLayer(val):void {
		if(this.layer.type=='text') this.slideComp.settings.layers[this.slideComp.cur_layer].layer_name = "Text: \""+val.text+"\"";
		else this.slideComp.settings.layers[this.slideComp.cur_layer].layer_name = val.layer_name;
		this.slideComp.settings.layers[this.slideComp.cur_layer].img_url = val.img_url;
		this.slideComp.settings.layers[this.slideComp.cur_layer].text = val.text;
		this.slideComp.settings.layers[this.slideComp.cur_layer].anchorX = val.anchorX;
		this.slideComp.settings.layers[this.slideComp.cur_layer].anchorY = val.anchorY;
		this.slideComp.settings.layers[this.slideComp.cur_layer].font = val.font;
		this.slideComp.settings.layers[this.slideComp.cur_layer].font_size = val.font_size;
		this.slideComp.updateAniLayer();
		
	}
}
