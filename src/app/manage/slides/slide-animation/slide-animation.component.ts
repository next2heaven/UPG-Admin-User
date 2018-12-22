import { bgLayer } from './../../../shared/models/manage/slides';
import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { TimelineMax } from 'gsap/all';
import { Sprite, Text } from 'pixi.js';
import { EventEmitter } from '@angular/core';

declare var TweenMax: any;
declare var PIXI: any; 

@Component({
	selector: 'app-slide-animation',
	templateUrl: './slide-animation.component.html',
	styleUrls: ['./slide-animation.component.scss']
})
export class SlideAnimationComponent implements OnInit, OnChanges {
	@ViewChild('pixi_container') pixi_container: ElementRef;
	@Input() layers:bgLayer[];
	@Input() is_paused:boolean = true;
	@Input() timeline_time:number = 0;
	@Output() percent_changed = new EventEmitter();
	@Input() tl_max_time:number = 120;
	pApp: any; 
	main_tl:TimelineMax;
	per:number;
	tl_max_time_ref:any;

	constructor() { }

	ngOnInit() {
		this.pApp = new PIXI.Application({ width: 960, height: 540 });
		this.pixi_container.nativeElement.appendChild(this.pApp.view);

		// ready main timeline
		this.main_tl = new TimelineMax({
			paused:this.is_paused,
			onUpdate:this.timelineUpdated
		});
		this.updateTimelineTotalTime();

		// Setup Assets
		this.layers.forEach(layer => {
			this.animateLayer(layer);
		});		
	}

	ngOnChanges(changes:SimpleChanges):void {
		if(changes.is_paused && this.main_tl){
			if(this.is_paused) this.main_tl.pause();
			else this.main_tl.play();	
		} else if(changes.tl_max_time){
			this.updateTimelineTotalTime();
		}
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


	// DRAWIMAGE
	public drawImage(layer):any {
		let sprite: Sprite = PIXI.Sprite.fromImage('/assets/imgs/temp_rock.png');
		sprite.x = 50;
		sprite.y = 50;
		this.pApp.stage.addChild(sprite);

		// Pivot
		sprite.anchor.set(layer.anchorX, layer.anchorY);

		return sprite;
	}


	// DRAW TEXT
	public drawText(layer):any {
		let text = new PIXI.Text(layer.text, this.updateTextProps(layer));
		this.pApp.stage.addChild(text);

		// Pivot
		text.anchor.set(layer.anchorX, layer.anchorY);

		return text;
	}



	public updateTextProps(layer){
		let prop:any = {};
		prop.fontFamily = 'Arial';
		prop.fontSize = 24;
		prop.fill = layer.color;
		prop.align = 'center';
		return prop;
	}


	
	public animateLayer(layer):void {
		// remove timeline object from main timeline
		if(layer.tl_ref) this.main_tl.remove(layer.tl_ref);
		if(layer.ref) this.pApp.stage.removeChild(layer.ref);


		if(layer.type=="image") layer.ref = this.drawImage(layer);
		if(layer.type=="text") layer.ref = this.drawText(layer);


		// Create a timeline
		let tl = new TimelineMax();
		this.main_tl.add(tl, 0);
		layer.tl_ref = tl;
		
		// Add keyframe animations
		layer.keyframes.forEach(key => {
			let props = {
				x: key.x,
				y: key.y,
				delay: key.delay - key.time,
				ease: eval(key.ease.replace('_', '.')),
				rotation: (key.rot * (Math.PI / 180))	// have to convert to radians
			}

			// Normal Properties
			tl.to(layer.ref, key.time, props, 0);

			// Scale
			//tl.to(layer.ref.scale, key.time, { x:2, y:2 }, 0);
			tl.to(layer.ref, key.time, { pixi: { scale: 3 }}, (key.delay - key.time));
			
		});
		tl.seek(this.timeline_time);		
	}










  updateTimelinePos(sec):void {
    this.main_tl.seek(sec);
  }
}
