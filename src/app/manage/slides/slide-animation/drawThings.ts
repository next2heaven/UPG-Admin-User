import { bgLayer } from './../../../shared/models/manage/slides';
import { Sprite, Text, Point } from 'pixi.js';
import "pixi-sound";

declare var TweenMax: any;
declare var PIXI: any; 

export class DrawThings {
	cur_width:number = 0;
	cur_height:number = 0;
	pApp:any;

	constructor(pApp){
		this.pApp = pApp;
	}

	setCurWH(w, h):void {
		this.cur_width = w;
		this.cur_height = h;
	}

	// Draw Image
	drawImage(layer:bgLayer):any {
		let sprite: Sprite = PIXI.Sprite.fromImage(layer.img_url);

		sprite.anchor.set(layer.anchorX, layer.anchorY);

		this.pApp.stage.addChild(sprite);		
		setTimeout(()=>{
			if (!sprite.texture.baseTexture.hasLoaded) {
				sprite.texture.baseTexture.on('loaded', ()=>{ 				
					this.adjustSpriteWH(sprite, layer);
				});
			} else this.adjustSpriteWH(sprite, layer);			
		},10);
		
		return sprite;
	}


	// DRAW TEXT
	drawText(layer:bgLayer):any {
		var container = new PIXI.Container();
		this.pApp.stage.addChild(container);

		// draw box
		var graphics = new PIXI.Graphics();
		graphics.lineStyle(2, 0xFF0000);
		var w = (layer.width/100) * layer.anchorX;
		var h = (layer.height) * layer.anchorY;
		graphics.drawRect(w*-1, h*-1, layer.width, layer.height);
		container.addChild(graphics);
		
		// Add text
		let text = new PIXI.Text(layer.text, this.updateTextProps(layer));
		container.addChild(text);

		// Pivot
		text.anchor.set(layer.anchorX, layer.anchorY);

		container.on('mousedown', this.dragStart);

		return container;
	}

	dragStart(e:any):boolean {
    return true;
	}


	// DRAW ANSWERS
	drawAnswers(layer:bgLayer):any {
		let curY = -169;
		let color1:any = [0x330000, 0x003300, 0x000033, 0x330033, 0x003333];
		let color2:any = [0xaa0000, 0x00aa00, 0x0000aa, 0xaa00aa, 0x00aaaa];
		var container = new PIXI.Container();
		let max_width = (this.cur_width>500)?500:this.cur_width;
		for(let i=0; i<5; i++){
			this.pApp.stage.addChild(container);

			// draw box
			var graphics = new PIXI.Graphics();
			graphics.beginFill(color1[i]);
			graphics.lineStyle(2, color2[i]);
			var w = (0.9 * max_width);
			var w2 = w/2;
			graphics.drawRoundedRect(w2*-1, curY, w, 54, 20);//
			container.addChild(graphics);
			
			
			// Add text
			let text = new PIXI.Text('Answer '+(i+1), {
				//fontFamily: layer.font,
				fontSize: 20,
				fill: 0xffffff,
				align: 'center',
				lineHeight: 22,
				wordWrap: true,
				wordWrapWidth: (max_width - 20)
			});
			text.y = curY+27;
			container.addChild(text);

			text.anchor.set(layer.anchorX, layer.anchorY);

			curY+= 70;
		}

		return container;
	}




	// LOAD SOUND
	loadSound(layer:bgLayer):any {
		if(!PIXI.sound.exists(layer.id)){
			console.log('loading sound...');
			return PIXI.sound.add(layer.id, {
				url: layer.sound_url,
				preload: true,
				loaded: function(err, sound) {
					console.log('Loaded:', layer.sound_url);
				}
			});
		} else return layer.ref;
	}










	/* UTIL FUNCTIONS */
	adjustSpriteWH(sprite:Sprite, layer:bgLayer):Sprite {
		if(layer.fit_screen){
			let wPer:number = this.cur_width / sprite.texture.width;
			let hPer:number = this.cur_height / sprite.texture.height;
			let vPer:number = (wPer > hPer)?wPer:hPer;
			sprite.width = sprite.texture.width * vPer;
			sprite.height = sprite.texture.height * vPer;
		} else {
			sprite.width = sprite.texture.width * (layer.width/100);
			sprite.height = sprite.texture.height * (layer.height/100);
		}
		return sprite;
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

}