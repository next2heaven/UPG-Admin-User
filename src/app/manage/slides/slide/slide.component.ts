import { SlideAnimationComponent } from './../slide-animation/slide-animation.component';
import { fadeIn } from './../../../animations';
import { AniBackground, bgLayer, LayerKeyProps } from './../../../shared/models/manage/slides';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { SlidesService } from './../../../services/manage/slides.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
	selector: 'app-slide',
	templateUrl: './slide.component.html',
	styleUrls: ['./slide.component.scss'],
	animations: [ fadeIn ]
})
export class SlideComponent implements OnInit {
	@ViewChild('slide_animation') slide_animation:SlideAnimationComponent;  
	@ViewChild('tabs') public tabs:NgbTabset;	
	public cur_layer: number = -1;
	public cur_keyframe: number = -1;
	settings: AniBackground = new AniBackground();
	timeline_time:number = 0;
	timeline_paused:boolean = true;
	timeline_per:number = 0;
	timeline_total_time:number = 120;

	myForm:FormGroup;
	error_msg:string;
	saveLabel:string = 'Save Changes';
	loading:boolean = true;	
	formState:string = 'init';


	constructor(
		private fb:FormBuilder,
		private slideServ:SlidesService
	) { }

	ngOnInit() {
		this.myForm = this.fb.group({
			id:[''],
			slide_name:['', [
				Validators.required,
				Validators.minLength(6)
			]]
		});

		this.slideServ.getSlide(1).subscribe(res => {
			let slide_data = res.data.slide;
			let slide_settings = JSON.parse(slide_data.settings);
			this.myForm.setValue({
				'id': slide_data.id,
				'slide_name': slide_data.slide_name
			});
			this.settings = slide_settings;			

			this.loading = false;
			
		});
	}


	// GETs
	get slide_name(){ return this.myForm.get('slide_name'); }





	setLayers(layers):void{
		this.settings.layers = layers;
	}


	backToLayers():void {
		this.updateAniLayer();
		this.cur_layer = -1;
	}

	updateAniLayer():void {
		this.slide_animation.animateLayer(this.settings.layers[this.cur_layer]);
	}

	updateKeyframe(layer_id, key_id):void {
		this.cur_layer = layer_id;
		this.cur_keyframe = key_id;
	}

	updateKeyProps(props):void {
		this.settings.layers[this.cur_layer].keyframes[this.cur_keyframe] = props;
		this.slide_animation.animateLayer(this.settings.layers[this.cur_layer]);
	}

	updateTime(sec):void {
		this.timeline_time = sec;
	}

	updateTimePlayhead(sec, per):void {
		this.timeline_time = sec;
		this.timeline_per = per;
		if(this.slide_animation) this.slide_animation.updateTimelinePos(this.timeline_time);
	}

	updateTotalTime(v):void {
		this.timeline_total_time = v;
	}

	timeline_per_update(per):void {
		this.timeline_per = per;
	}

	addedLayer(layer):void {
		this.slide_animation.animateLayer(layer);
	}

	addKey(pos):void {
		let key = new LayerKeyProps();
		key.delay = pos;
		this.settings.layers[this.cur_layer].keyframes.unshift(key);
		this.cur_keyframe = 0;
	}

	deleteKey(pos):void {
		console.log(pos);
	}







	saveForm(){
		let save_settings:AniBackground = this.settings;
		save_settings.layers.forEach(layer => {
			layer.ref = null;
			layer.tl_ref = null;
		});

		if(this.myForm.valid){
			this.showSave();
			this.slideServ.saveSlide({
				id: this.myForm.get('id').value,
				slide_name: this.myForm.get('slide_name').value,
				settings: save_settings,
				live: 1
			}).subscribe( res => {
				if(res!==null){
					if(res.hasOwnProperty('status') && res.status=='success'){
						this.saveSuccess();
					} else {
						// Show error message
						if(res.data.message) this.error_msg = res.data.message;
						this.showError();						
					} 
				} else this.showError();				
			}, error => {
				this.error_msg = error;         
				this.showError();
			}); 
		}
	}
	private showSave(){
		this.formState = 'saving';
		this.saveLabel = 'Saving...';
	}
	private resetSave(){
		this.formState = 'init';
		this.saveLabel = 'SAVE';
	}	
	private saveSuccess(){
		this.formState = 'success';
		this.saveLabel = 'Saved Successfully!';
		setTimeout(() => { this.resetSave(); }, 2000);
	}	
	private showError(){
		this.formState = 'error';
		this.saveLabel = 'Form Error';
		setTimeout(() => { this.resetSave(); }, 4000);
	}
	
}
