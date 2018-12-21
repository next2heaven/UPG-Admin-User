export class AniBackground {
	categories: number[] = [];
	layers: bgLayer[] = [];
}

export class bgLayer {
	ref:any = null;
	tl_ref:any = null;
	layer_name: string = '';
	type: string = '';
	img_url: string = '';
	text: string = 'Default Text';
	keyframes: LayerKeyProps[] = [];
}


export class LayerKeyProps {
	delay: number = 0;
	time: number = 0;
	x: number = 480;
	y: number = 270;
	scale_x: number = 1;
	scale_y: number = 1;
	pivot_x: number = 50;
	pivot_y: number = 50;
	rotation: number = 0;
	ease_in: string = 'CubicIn';
	ease_out: string= 'CubicOut';
}