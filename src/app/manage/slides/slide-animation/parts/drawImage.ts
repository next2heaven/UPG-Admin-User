import { bgLayer } from './../../../../shared/models/manage/slides';
import { Sprite, Text, Point } from 'pixi.js';
import "pixi-sound";

declare var TweenMax: any;
declare var PIXI: any; 

export class DrawImage extends PIXI.Sprite {
	cur_width:number = 0;
	cur_height:number = 0;


	setCurWH(w, h):void {
		this.cur_width = w;
		this.cur_height = h;
	}

	// Draw Image
	draw(layer:bgLayer):any {
		let sprite: Sprite = PIXI.Sprite.fromImage(layer.img_url);

		sprite.anchor.set(layer.anchorX, layer.anchorY);

		this.stage.addChild(sprite);
		setTimeout(()=>{
			if (!sprite.texture.baseTexture.hasLoaded) {
				sprite.texture.baseTexture.on('loaded', ()=>{ 				
					this.adjustSpriteWH(sprite, layer);
				});
			} else this.adjustSpriteWH(sprite, layer);			
		},10);
		
		return sprite;
	}



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
}