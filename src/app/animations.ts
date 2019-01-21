import { trigger, transition, state, animate, style } from '@angular/animations';

// Fade
export let fade = trigger('fade', [
	state('void', style({ opacity:0 })),
	transition(':enter, :leave', [
		animate(500)
	])
]);


export let fadeBG = trigger('fadeBG', [
	state('void', style({ opacity:0 })),
	transition(':enter, :leave', [
		animate('1s 500ms ease-out')
	])
]);


export let fadeIn = trigger('fade', [
	state('void', style({ opacity:0 })),
	transition(':enter', [
		animate(500)
	])
]);