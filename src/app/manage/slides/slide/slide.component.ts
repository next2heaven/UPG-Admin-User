import { ActivatedRoute } from '@angular/router';
import { SlideAnimationComponent } from './../slide-animation/slide-animation.component';
import { fadeIn } from './../../../animations';
import { AniBackground, bgLayer, LayerKeyProps } from './../../../shared/models/manage/slides';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { SlidesService } from './../../../services/manage/slides.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
	selector: 'app-slide',
	templateUrl: './slide.component.html',
	styleUrls: ['./slide.component.scss'],
	animations: [ fadeIn ]
})
export class SlideComponent implements OnInit {
	@ViewChild('slide_animation') slide_animation:SlideAnimationComponent;  
	@ViewChild('tabs') public tabs:NgbTabset;	
	@ViewChild('temp_slide_type') public temp_slide_type:ElementRef;	
	@ViewChild('temp_categories') public temp_categories:ElementRef;	
	public cur_layer: number = -1;
	public cur_keyframe: number = -1;
	settings: AniBackground = new AniBackground();
	timeline_time:number = 0;
	timeline_paused:boolean = true;
	timeline_per:number = 0;
	timeline_total_time:number = 60;
	device:string = 'ss';

	myForm:FormGroup;
	error_msg:string;
	saveLabel:string = 'Save Changes';
	loading:boolean = true;	
	formState:string = 'init';

	area_types:object = {
		title:'Title Screen',
		round:'Round Screen',
		winning:'Winning Screen',
		background:'Basckground',
		mult_overlay:'Multiple Choice Overlay',
		order:'Order Screen',
		tf:'T/F Screen'
	};
	categories_list:object = {
		history: 'History',
		halloween: 'Halloween'
	};


	constructor(
		private fb:FormBuilder,
		private slideServ:SlidesService,
		private activatedRoute:ActivatedRoute
	) { }

	ngOnInit() {
		this.myForm = this.fb.group({
			id:[''],
			slide_name:['', [
				Validators.required,
				Validators.minLength(3)
			]],
			device:['ud'],
			slide_type: new FormControl(null),
			categories: new FormControl(null)
		});

		this.activatedRoute.params.subscribe(paramsId => {

			this.slideServ.getSlide( paramsId.id ).subscribe(res => {
				let slide_data = res.data.slide;
				let slide_settings = JSON.parse(slide_data.settings);

				// check if empty
				if(Object.keys(slide_settings).length === 0 && slide_settings.constructor === Object){
					slide_settings = new AniBackground();
				}
				
				this.myForm.patchValue({
					'id': slide_data.id,
					'slide_name': slide_data.slide_name,
					'slide_type': slide_data.slide_type.split(','),
					'categories': slide_data.categories.split(',')
				});
				this.settings = slide_settings;
	
				this.loading = false;
			});

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

	removeLayer():void {
		let last_layer:number = this.cur_layer;
		this.cur_layer = -1;
		this.settings.layers.splice(last_layer,1);
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
		// round pos
		pos = pos.toFixed(1);

		// get last key
		let key_start_time = 0;
		for(let key of this.settings.layers[this.cur_layer].keyframes){
			if(key.delay<pos && pos>key_start_time) key_start_time = key.delay;
		}

		// add keyframe
		let key = new LayerKeyProps();
		if(this.settings.layers[this.cur_layer].type=='event') key.time = 0;
		else key.time = pos-key_start_time;
		key.delay = pos;
		this.settings.layers[this.cur_layer].keyframes.unshift(key);
		this.cur_keyframe = 0;
	}

	deleteKey(pos):void {
		this.settings.layers[this.cur_layer].keyframes.splice(this.cur_keyframe,1);
	}

	redrawAnimation():void {
		this.slide_animation.redrawAll();
	}






	saveForm(){
		console.log(this.temp_slide_type);

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
				slide_type: this.myForm.get('slide_type').value.toString(),
				categories: this.myForm.get('categories').value.toString(),
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
