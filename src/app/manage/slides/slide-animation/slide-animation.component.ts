import { bgLayer } from './../../../shared/models/manage/slides';
import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { TimelineMax } from 'gsap/all';
import { Sprite, Text, Point } from 'pixi.js';
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
		PIXI.settings.GC_MODES = PIXI.GC_MODES.AUTO;
		this.pApp = new PIXI.Application({ width: 960, height: 540, antialias: true, transparent: false });
		this.pixi_container.nativeElement.appendChild(this.pApp.view);

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



	redrawAll():void {
		this.layers.forEach(layer => {
			this.animateLayer(layer);
		});
	}


	// DRAWIMAGE
	drawImage(layer):any {
		let sprite: Sprite = PIXI.Sprite.fromImage(layer.img_url);
		sprite.x = 50;
		sprite.y = 50;
		sprite.scale.set(.5, .5);

		// Pivot
		sprite.anchor.set(layer.anchorX, layer.anchorY);

		this.pApp.stage.addChild(sprite);

		return sprite;
	}


	// DRAW TEXT
	drawText(layer):any {
		var container = new PIXI.Container();
		this.pApp.stage.addChild(container);

		// draw box
		var graphics = new PIXI.Graphics();
		graphics.lineStyle(2, 0xFF0000);
		var w = layer.width * layer.anchorX;
		var h = layer.height * layer.anchorY;
		graphics.drawRect(w*-1, h*-1, layer.width, layer.height);
		container.addChild(graphics);

		
		// Add text
		let text = new PIXI.Text(this.getText(layer.text), this.updateTextProps(layer));
		container.addChild(text);

		// Pivot
		text.anchor.set(layer.anchorX, layer.anchorY);


		return container;
	}



	updateTextProps(layer){
		let prop:any = {};
		prop.fontFamily = layer.font;
		prop.fontSize = layer.font_size;
		prop.fill = layer.color;
		prop.align = 'center';
		prop.wordWrap = true;
    prop.wordWrapWidth = layer.width;
		return prop;
	}


	removeLayer(ref):void {
		this.pApp.stage.removeChild(ref);
	}
	removeTimeline(ref):void {
		this.main_tl.remove(ref);
	}
	
	animateLayer(layer):void {
		// remove timeline object from main timeline
		if(layer.tl_ref) this.removeLayer(layer.tl_ref);
		if(layer.ref) this.removeLayer(layer.ref);
		//myRenderer.textureGC.run();


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
				alpha: key.alpha,
				rotation: (key.rot * (Math.PI / 180))	// have to convert to radians
			}

			// Normal Properties
			tl.to(layer.ref, key.time, props, 0);

			// Scale
			//tl.to(layer.ref.scale, key.time, { x:2, y:2 }, 0);
			let newScaleX = ((key.scaleX - 1) / 2)+1;
			let newScaleY = ((key.scaleY - 1) / 2)+1;
			tl.to(layer.ref, key.time, { pixi: { scaleX:newScaleX, scaleY:newScaleY }}, (key.delay - key.time));
			
			
		});
		tl.seek(this.timeline_time);		
	}





	getText(txt) {
		txt = txt.replace('{question}', 'This is a question that will go to multiple lines and be pretty long?');
		txt = txt.replace('{answer1}', 'Sweet');
		txt = txt.replace('{answer2}', 'Michael Jackson');
		txt = txt.replace('{answer3}', 'Huckle Berry Finn');
		txt = txt.replace('{answer4}', 'The University of Utah Gymnastics');
		txt = txt.replace('{roundNum}', '2');
		return txt;
	}





  updateTimelinePos(sec):void {
    this.main_tl.seek(sec);
  }
}
