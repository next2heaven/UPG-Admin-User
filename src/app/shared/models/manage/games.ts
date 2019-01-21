export class Game {
	game_name:string = '';
	playlist:GamePlaylist = new GamePlaylist();
	updated:Date = new Date();
	created:Date = new Date();
}

export class GamePlaylist {
	 screens:GameScreens[] = [];
}

export class GameScreens {
	screen_name:string;
	actions:GameScreenActions[] = [];
}

export class GameScreenActions {
	type:string;
	icon:string;
	iconr:string;
	name:string;
	action:string;
	options:object;
}



export class GameLists { 
	screens:GameScreens[] = [
		{ screen_name:'Title', actions:[] },
		{ screen_name:'Intro', actions:[] },
		{ screen_name:'Round X', actions:[] },
		{ screen_name:'Question & Answer', actions:[] },
		{ screen_name:'Question', actions:[] },
		{ screen_name:'Distribute Cards' , actions:[]},
		{ screen_name:'Winner Screen', actions:[] }
	];

	actions:GameScreenActions[] = [
		{ type:'action', icon:'clock', iconr:'hand-paper', name:'Wait X Seconds', action:'continue', options:{} },
		{ type:'action', icon:'eye', iconr:'', name:'Show Timer', action:'continue', options:{} }
	];

	device:GameScreenActions[] = [
		{ type:'device', icon:'mobile-alt', iconr:'eye', name:'Show Answers', action:'continue', options:{} },
		{ type:'device', icon:'mobile-alt', iconr:'clock', name:'VOTE: Team Answer Set', action:'continue', options:{} }
	];

	events:GameScreenActions[] = [
		{ type:'event', icon:'exchange-alt', iconr:'hand-paper', name:'Wait for Judge to choose favorite card', action:'stope', options:{} },
		{ type:'event', icon:'exchange-alt', iconr:'', name:'Wait for all player answers or time to run out', action:'stop', options:{} }
	];
}