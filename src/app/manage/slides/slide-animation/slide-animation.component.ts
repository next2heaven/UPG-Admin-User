import { SlideComponent } from './../slide/slide.component';
import { bgLayer } from './../../../shared/models/manage/slides';
import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { TimelineMax, Power1, Bounce } from 'gsap/all';
import { Sprite, Application, Rectangle, Texture, Container, DisplayObject, Text } from 'pixi.js';
import { EventEmitter } from '@angular/core';

//declare var TweenMax: any;
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
	@Output() percent_changed = new EventEmitter();
	pApp: any; 
	main_tl:TimelineMax;
	per:number;

	constructor() { }

	ngOnInit() {
		this.pApp = new PIXI.Application({ width: 960, height: 540 });
		this.pixi_container.nativeElement.appendChild(this.pApp.view);

		// ready main timeline
		this.main_tl = new TimelineMax({
			paused:this.is_paused,
			onUpdate:this.timelineUpdated
		});
		let tl = new TimelineMax();
		this.main_tl.add(tl, 0);
		tl.addCallback(()=>{}, 300);	// total time of timeline

		// Setup Assets
		this.layers.forEach(layer => {
			this.animateLayer(layer);
		});		
	}

	ngOnChanges(changes:SimpleChanges):void {
		if(changes.is_paused && this.main_tl){
			if(this.is_paused) this.main_tl.pause();
			else this.main_tl.play();
		}
	}

	private timelineUpdated = (event: any) => {
		this.per = this.main_tl.progress();
		this.percent_changed.emit(this.main_tl.progress());
	}



	public drawImage(layer):any {
		let sprite: Sprite = PIXI.Sprite.fromImage('/assets/imgs/temp_rock.png');
		sprite.x = 50;
		sprite.y = 50;
		this.pApp.stage.addChild(sprite);
		return sprite;
	}

	public drawText(layer):any {
		let text = new PIXI.Text(layer.text, this.updateProps(layer));
		this.pApp.stage.addChild(text);
		return text;
	}

	public updateProps(layer){
		let prop:any = {};
		prop.fontFamily = 'Arial';
		prop.fontSize = 24;
		prop.fill = 0xff1010;
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
			//tl.fromTo(layer.ref, 2, {x: 20}, {x: 440, ease: Power1.easeOut}, 0);
			//tl.fromTo(layer.ref, 2, {y: 20}, {y: 440, ease: Bounce.easeOut}, 0);
			tl.to(layer.ref, key.time, key, 0);

			//ease: eval("Elastic.easeOut.config(1.5, 0.5)")
		});
		
	}






  updateTimelinePos(sec):void {
    this.main_tl.seek(sec);
  }
}
