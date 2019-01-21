export class AniBackground {
	layers: bgLayer[] = [];
}

export class bgLayer {
	ref:any = null;
	tl_ref:any = null;
	layer_name: string = '';
	type: string = '';
	img_url: string = '';
	text: string = 'Default Text';
	anchorX: number = .5;
	anchorY: number = .5;
	width: number = 800;
	height: number = 200;
	color:string = '#ffffff';
	font:string = 'Arial';
	font_size:number = 24;
	keyframes: LayerKeyProps[] = [];
}


export class LayerKeyProps {
	delay: number = 0;
	time: number = 0;
	x: number = 480;
	y: number = 270;
	scaleX: number = 1;
	scaleY: number = 1;
	alpha: number = 1;
	anchorX: number = .5;
	anchorY: number = .5;
	rot: number = 0;
	ease: string = 'Power3.easeInOut';
	ending: boolean = false;
}
