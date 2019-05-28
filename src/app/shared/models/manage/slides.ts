import { environment } from '../../../../environments/environment';
export class AniBackground {
	layers: bgLayer[] = [];
}

export class bgLayer {
	id?:string = '';
	ref:any = null;
	tl_ref:any = null;
	device:string = 'ud';
	layer_name: string = '';
	type: string = '';
	asset_url: string = '';
	text: string = 'Default Text';
	anchorX: number = .5;
	anchorY: number = .5;
	width: number = 80;
	height: number = 30;
	fit_screen: boolean = false;
	color:string = '#ffffff';
	bg_color:string = environment.colorsHex[0];
	font:string = 'Arial';
	font_size:number = 24;
	onclick:string = '';
	display:string = 'all';
	keyframes: LayerKeyProps[] = [];
	offset:number = 0;
}


export class LayerKeyProps {
	delay: number = 0;
	time: number = 0;
	x: number = 50;
	y: number = 50;
	scaleX: number = 1;
	scaleY: number = 1;
	alpha: number = 1;
	anchorX: number = .5;
	anchorY: number = .5;
	rot: number = 0;
	ease: string = 'Power3.easeInOut';
	ending: boolean = false;
	event:string = '';
}



export class CategoriesSet {
	c:string = '';
}