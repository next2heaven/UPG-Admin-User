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
	actions?:GameScreenActions[];
	repeat_amount:number;
	special_repeat:string;
	end_prev_repeat?:boolean;
	end_prev_spec_repeat?:boolean;
	theme?:number;
	max_players?:number;
	req_even_teams?:number;
	start_point_val?:number;
	
}

export class GameScreenActions {
	id:number;
	type:string;
	icon:string;
	iconr:string;
	name:string;
	action:string;
	seconds?:number;
	timer?:number;
	add?:number;
	give_num?:number;
	lt_cards?:number;
}


export class ThemesList { 
	id:number;
	theme_name:string;
}




export class GameLists { 
	screens:GameScreens[] = [
		{ screen_name:'Title', repeat_amount:1, special_repeat:'None', actions:[] },
		{ screen_name:'Intro', repeat_amount:1, special_repeat:'None', actions:[] },
		{ screen_name:'Round X', repeat_amount:1, special_repeat:'None', actions:[] },
		{ screen_name:'Question & Answer', repeat_amount:1, special_repeat:'None', actions:[] },
		{ screen_name:'Question', repeat_amount:1, special_repeat:'None', actions:[] },
		{ screen_name:'Distribute Cards', repeat_amount:1, special_repeat:'None', actions:[] },
		{ screen_name:'Winner Screen', repeat_amount:1, special_repeat:'None', actions:[] },
		{ screen_name:'FINAL: Either Or', repeat_amount:1, special_repeat:'None', actions:[] }
	];

	actions:GameScreenActions[] = [
		{ id:1, type:'action', icon:'clock', iconr:'hand-paper', name:'Wait 3 Seconds', action:'wait', seconds:3 },
		{ id:2, type:'action', icon:'eye', iconr:'', name:'Show Timer', action:'continue' },
		{ id:3, type:'action', icon:'eye', iconr:'', name:'Start Timer (45 sec)', action:'continue', timer:15 },
		{ id:4, type:'action', icon:'eye', iconr:'hand-paper', name:'Reveal Correct Answer', action:'wait' },
		{ id:5, type:'action', icon:'eye', iconr:'hand-paper', name:'Reveal Team Answers', action:'wait' },
		{ id:6, type:'action', icon:'eye', iconr:'', name:'Reveal Judges Answer', action:'continue' },
		{ id:7, type:'action', icon:'eye', iconr:'', name:'Add 100 to Point Value', action:'continue', add:100 }

	];

	device:GameScreenActions[] = [
		{ id:100, type:'device', icon:'mobile-alt', iconr:'eye', name:'Show Answers', action:'continue',  },
		{ id:101, type:'device', icon:'mobile-alt', iconr:'eye', name:'Show Answers To Judge', action:'continue' },
		{ id:110, type:'device', icon:'mobile-alt', iconr:'clock', name:'Players Play Card', action:'continue' },
		{ id:120, type:'device', icon:'mobile-alt', iconr:'clock', name:'Judge Votes', action:'continue' },
		{ id:121, type:'device', icon:'mobile-alt', iconr:'clock', name:'Other Teams Vote', action:'continue' },
		{ id:130, type:'device', icon:'mobile-alt', iconr:'clock', name:'Give All Players 5 Card(s)', action:'continue', give_num:5 },
		{ id:131, type:'device', icon:'mobile-alt', iconr:'clock', name:'Give All Players 1 Card If They Have Less < 5 Cards', action:'continue', give_num:1, lt_cards:5 }
	];

	events:GameScreenActions[] = [
		{ type:'event', icon:'clock', iconr:'hand-paper', name:'Wait for all players to answer or time to run out', action:'stop', id:200 },
		{ type:'event', icon:'clock', iconr:'hand-paper', name:'Wait for Judge to choose favorite card', action:'stop', id:201 }
	];
}