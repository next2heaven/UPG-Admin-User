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
	id:number;
	screen_name:string;
	actions?:GameScreenActions[];
	repeat_amount:number;
	special_repeat:string;
	class_name:string;
	end_prev_repeat?:boolean;
	end_prev_spec_repeat?:boolean;
	theme_id?:number;
	max_players?:number;
	req_even_teams?:number;
	start_point_val?:number;
	num_questions?:string;
}

export class GameScreenActions {
	id:number;
	type:string;
	icon:string;
	iconr:string;
	name:string;
	seconds?:number;
	timer?:number;
	add?:number;
	give_num?:number;
	lt_cards?:number;
	class_name:string;
}


export class ThemesList { 
	id:number;
	theme_name:string;
}




export class GameLists { 
	screens:GameScreens[] = [
		{ id:1, screen_name:'Title', repeat_amount:1, special_repeat:'None', actions:[], class_name:'Title' },
		{ id:2, screen_name:'Intro', repeat_amount:1, special_repeat:'None', actions:[], class_name:'Intro' },
		{ id:3, screen_name:'Round X', repeat_amount:1, special_repeat:'None', actions:[], class_name:'Round' },
		{ id:4, screen_name:'Question & Answer', repeat_amount:1, special_repeat:'None', actions:[], class_name:'QA' },
		{ id:5, screen_name:'Question', repeat_amount:1, special_repeat:'None', actions:[], class_name:'Q' },
		{ id:6, screen_name:'Distribute Cards', repeat_amount:1, special_repeat:'None', actions:[], class_name:'DistributeCards' },
		{ id:7, screen_name:'Winner Screen', repeat_amount:1, special_repeat:'None', actions:[], class_name:'Winner' },
		{ id:8, screen_name:'FINAL: Either Or', repeat_amount:1, special_repeat:'None', actions:[], class_name:'FinalEO' }
	];

	actions:GameScreenActions[] = [
		{ id:1, type:'action', icon:'clock', iconr:'hand-paper', name:'Wait 3 Seconds', seconds:3, class_name:'Wait' },
		{ id:2, type:'action', icon:'eye', iconr:'', name:'Show Timer', class_name:'Wait' },
		{ id:3, type:'action', icon:'eye', iconr:'', name:'Start Timer (45 sec)', timer:15, class_name:'Wait' },
		{ id:10, type:'action', icon:'eye', iconr:'', name:'Show Available Answers', class_name:'Wait' },
		{ id:20, type:'action', icon:'eye', iconr:'hand-paper', name:'Reveal Correct Answer', class_name:'Wait' },
		{ id:21, type:'action', icon:'eye', iconr:'hand-paper', name:'Reveal Team Answers', class_name:'Wait' },
		{ id:22, type:'action', icon:'eye', iconr:'', name:'Reveal Judges Answer', class_name:'Wait' },
		{ id:30, type:'action', icon:'eye', iconr:'', name:'Add 100 to Point Value', add:100, class_name:'Wait' }

	];

	device:GameScreenActions[] = [
		{ id:100, type:'device', icon:'mobile-alt', iconr:'eye', name:'Show Answer(s)', class_name:'Wait' },
		{ id:101, type:'device', icon:'mobile-alt', iconr:'eye', name:'Show Answers To Judge', class_name:'Wait' },
		{ id:110, type:'device', icon:'mobile-alt', iconr:'clock', name:'Players Play Card', class_name:'Wait' },
		{ id:120, type:'device', icon:'mobile-alt', iconr:'clock', name:'Judge Votes', class_name:'Wait' },
		{ id:121, type:'device', icon:'mobile-alt', iconr:'clock', name:'Other Teams Vote', class_name:'Wait' },
		{ id:130, type:'device', icon:'mobile-alt', iconr:'clock', name:'Give All Players 5 Card(s)', give_num:5, class_name:'Wait' },
		{ id:131, type:'device', icon:'mobile-alt', iconr:'clock', name:'Give All Players 1 Card If They Have Less < 5 Cards', give_num:1, lt_cards:5, class_name:'Wait' }
	];

	events:GameScreenActions[] = [
		{ id:200, type:'event', icon:'clock', iconr:'hand-paper', name:'Wait for all players to answer or time to run out', class_name:'Wait' },
		{ id:201, type:'event', icon:'clock', iconr:'hand-paper', name:'Wait for Judge to choose favorite card', class_name:'Wait' }
	];
}