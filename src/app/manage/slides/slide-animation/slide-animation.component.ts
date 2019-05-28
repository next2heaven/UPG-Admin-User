import { bgLayer } from './../../../shared/models/manage/slides';
import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { TimelineMax } from 'gsap/all';
import { EventEmitter } from '@angular/core';
import { DrawThings } from './drawThings';

declare var TweenMax: any;
declare var PIXI: any; 

@Component({
	selector: 'app-slide-animation',
	templateUrl: './slide-animation.component.html',
	styleUrls: ['./slide-animation.component.scss']
})
export class SlideAnimationComponent implements OnInit, OnChanges {
	@ViewChild('pixi_container') pixi_container: ElementRef;
  @Input() cur_layer:number;
  @Input() cur_keyframe:number;
	@Input() layers:bgLayer[];
	@Input() is_paused:boolean = true;
	@Input() timeline_time:number = 0;
	@Output() percent_changed = new EventEmitter();
	@Output() updated_xy = new EventEmitter();
	@Input() tl_max_time:number = 60;
	@Input() device:string;
	drawThings:DrawThings;
	pApp: any; 
	main_tl:TimelineMax;
	per:number;
	tl_max_time_ref:any;
	cur_width:number = 375;
	cur_height:number = 667;
	last_timeline:TimelineMax;
	obj_data:any;
	dragging:boolean;

	constructor() { }

	ngOnInit() {
		PIXI.settings.GC_MODES = PIXI.GC_MODES.AUTO;
		this.pApp = new PIXI.Application({ width: 375, height: 667, antialias: true, transparent: false });
		this.pixi_container.nativeElement.appendChild(this.pApp.view);

		this.drawThings = new DrawThings(this.pApp);

		// ready main timeline
		this.main_tl = new TimelineMax({
			paused:this.is_paused,
			onUpdate:this.timelineUpdated
		});
		this.updateTimelineTotalTime();

		this.redrawAll();	
	}

	ngOnChanges(changes:SimpleChanges):void {	
		if(changes.is_paused && this.main_tl){
			if(this.is_paused){
				this.main_tl.pause();
				this.stopSound();

			} else this.main_tl.play();	
		} else if(changes.tl_max_time){
			this.updateTimelineTotalTime();
		} else if(changes.device) this.redrawAll();
		else if(changes.cur_layer) this.redrawAll();
	}

	private timelineUpdated = (event: any) => {
		this.per = this.main_tl.progress();
		this.percent_changed.emit(this.main_tl.progress());
	}

	private updateTimelineTotalTime():void{
		if(this.tl_max_time_ref) this.tl_max_time_ref.remove();
		if(this.main_tl){
			let tl = new TimelineMax();
			this.main_tl.add(tl, 0);
			tl.addCallback(()=>{}, this.tl_max_time);	// total time of timeline
			this.tl_max_time_ref = tl;
		}
	}



	redrawAll():void {
		if(this.device=='ud'){
			this.cur_width = 375;
			this.cur_height = 667;
		} else if(this.device=='ss'){
			this.cur_width = 960;
			this.cur_height = 540;
		}
		this.drawThings.setCurWH(this.cur_width, this.cur_height);
		this.pApp.renderer.resize(this.cur_width, this.cur_height);

		// Kill objects
		for (var i = this.pApp.stage.children.length - 1; i >= 0; i--) {	
			this.pApp.stage.removeChild(this.pApp.stage.children[i]);
		};
		

		let asset_id:number = 0;
		this.layers.forEach(layer => {
			layer.id = 'asset_'+(asset_id+1);
			if(this.device==layer.device){
				this.drawLayer(layer, asset_id);
				setTimeout(()=>{
					this.animateLayer(layer);
				}, 50);
			}	
			asset_id++;
		});
	}


	removeLayer(ref):void {
		this.pApp.stage.removeChild(ref);
	}
	removeTimeline(ref):void {
		this.main_tl.remove(ref);
	}
	
	drawLayer(layer:bgLayer, asset_id:number):void {

		// remove timeline object from main timeline
		if(layer.tl_ref) this.removeLayer(layer.tl_ref);
		if(layer.ref) this.removeLayer(layer.ref);
		//myRenderer.textureGC.run();

		if(layer.type=="image") layer.ref = this.drawThings.drawImage(layer);
		else if(layer.type=="button") layer.ref = this.drawThings.drawButton(layer);
		else if(layer.type=="text") layer.ref = this.drawThings.drawText(layer);
		else if(layer.type=="answers") layer.ref = this.drawThings.drawAnswers(layer);
		else if(layer.type=="sound") layer.ref = this.drawThings.loadSound(layer);
		else if(layer.type=="joined_players") layer.ref = this.drawThings.joinedPlayers(layer);
		//else if(layer.type=="start_game") layer.ref = this.drawThings.startGameButton(layer);

		
		// Make object Draggable
		if(asset_id==this.cur_layer 
				&& this.cur_keyframe>-1
				&& layer.type!='sound'
				&& layer.fit_screen!=true){
			this.makeInteractive(layer);
		}

		// Kill timeline
		if(this.last_timeline){
			this.last_timeline.kill();
			this.last_timeline = null;
		}
	}

	animateLayer(layer:bgLayer):void {

		// Create a timeline
		let tl:TimelineMax = new TimelineMax();
		this.last_timeline = tl;
		this.main_tl.add(tl, 0);
		layer.tl_ref = tl;

		// Add keyframe animations
		layer.keyframes.forEach(key => {
			if(layer.type=='event'){
				tl.addCallback(this.eventCallback, key.time, ["EVENT: "+key.event]);

			} else if(layer.type=='sound'){
				tl.addCallback(this.soundCallback, key.delay, [layer.id]);

			} else {
				let props = {
					x: (key.x*this.cur_width) / 100,
					y: (key.y*this.cur_height) / 100,
					delay: key.delay - key.time,
					ease: eval(key.ease.replace('_', '.')),
					alpha: key.alpha,
					rotation: (key.rot * (Math.PI / 180))	// have to convert to radians
				}

				// Normal Properties
				tl.to(layer.ref, key.time, props, 0);

				// Scale
				let newScaleX = ((key.scaleX - 1) / 2)+1;
				let newScaleY = ((key.scaleY - 1) / 2)+1;
				tl.to(layer.ref, key.time, { 
					pixi: { scaleX:newScaleX, scaleY:newScaleY },
					delsy:(key.delay - key.time)
				}, 0);
			}
		});
		tl.seek(this.timeline_time);
	}





	// CALLBACKS
	eventCallback(event_name):void {
		console.log(event_name);
	}

	soundCallback(sound_id:string):void {
		console.log('Play sound', sound_id);
		PIXI.sound.play(sound_id);
	}





  updateTimelinePos(sec):void {
    this.main_tl.seek(sec);
	}
	

	stopSound():void {
		this.layers.forEach(layer => {
			if(this.device==layer.device){
				if(layer.type=='sound'){
					layer.ref.pause();
				}
			}
		});
	}





	makeInteractive(layer:bgLayer):void { 
		layer.ref.interactive = true;
		layer.ref.buttonMode = true;
		layer.ref.on('mousedown', (e) => { this.obj_data = e.data; this.dragging = true; })
			.on('touchstart', (e) => { this.obj_data = e.data; this.dragging = true; })
			// events for drag end
			.on('mouseup', (e) => { this.obj_data = null; this.dragging = false; })
			.on('mouseupoutside', (e) => { this.obj_data = null; this.dragging = false; })
			.on('touchend', (e) => { this.obj_data = null; this.dragging = false; })
			.on('touchendoutside', (e) => { this.obj_data = null; this.dragging = false; })
			// events for drag move
			.on('mousemove', (e)=>{
				if (this.dragging && e.target){
					var newPosition = this.obj_data.getLocalPosition( e.target.parent );
					e.target.position.x = newPosition.x;
					e.target.position.y = newPosition.y;
					this.updated_xy.emit({
						x:this.round((newPosition.x/this.cur_width) * 100, 1),
						y:this.round((newPosition.y/this.cur_height) * 100, 1)
					});	
				}
			});
	}

	round(value:number, precision:number):number {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
	}
}
