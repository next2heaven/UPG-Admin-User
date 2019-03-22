import { GamePlaylist, GameLists, GameScreens, GameScreenActions, ThemesList } from './../../../shared/models/manage/games';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from './../../../services/manage/games.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/shared/models/manage/games';
import { fadeIn } from 'src/app/animations';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
	animations: [ fadeIn ]
})
export class GameComponent implements OnInit {
	myForm:FormGroup;
	themes:ThemesList[];
	error_msg:string;
	saveLabel:string = 'Save Changes';
	loading:boolean = true;	
  formState:string = 'init';
  playlist:GamePlaylist;
  editing_screen:number = -1;
	editing_event:number = -1;
	cur_screen:GameScreens;
	cur_actions:GameScreenActions;
	action_parent_id:number;
  playlist_options = new GameLists();
  options: SortablejsOptions = {
    group:  { name : 'group1', pull: "clone", put: false, revertClone: false },
		animation: 150,
		onAdd:(event) => {
			setTimeout(() => { 
				this.playlist_options = new GameLists();
				this.doneEditing();
			}, 100);
		}
  };
  options2: SortablejsOptions = {
    group:  { name : 'group2', pull: "clone", put: false, revertClone: true },
		animation: 150
	};
	repeat_list:object = ['None', 'Have all players be a Judge', 'Repeat Till All Answers Given', 'Repeat Till Player Wins'];



  constructor(
		private fb:FormBuilder,
		private gameServ:GamesService,
		private activatedRoute:ActivatedRoute
	) { }

	ngOnInit() {
		// Game Form
		this.myForm = this.fb.group({
			id:[''],
			game_name:['', [
				Validators.required,
				Validators.minLength(6)
      ]],
      playlist:[new GamePlaylist]
		});

		this.activatedRoute.params.subscribe(paramsId => {

			this.gameServ.getGame( paramsId.id ).subscribe(res => {
        let game_data = res.data.game;
				this.playlist = JSON.parse(game_data.playlist);
				this.themes = res.data.themes;
				
				// check if empty
        if(Object.keys(this.playlist).length === 0 && this.playlist.constructor === Object) this.playlist = new GamePlaylist();	
				

				this.myForm.setValue({
					'id': game_data.id,
					'game_name': game_data.game_name,
					'playlist': this.playlist
        });
        

				this.loading = false;
      });
      
		});


		
	}


	// GETs
  get game_name(){ return this.myForm.get('game_name'); }
  




	secondsChanged(e){
		this.cur_actions.name = 'Wait '+e+' Seconds';
	}
	timerChanged(e){
		this.cur_actions.name = 'Start Timer ('+e+' sec)';
	}
	addChanged(e){
		this.cur_actions.name = 'Add '+e+' to Point Value';
	}
	giveChanged(){
		if(this.cur_actions.id==130) this.cur_actions.name = 'Give All Players '+this.cur_actions.give_num+' Card(s)';
		if(this.cur_actions.id==131) this.cur_actions.name = 'Give All Players '+this.cur_actions.give_num+' Card(s) If They Have Less < '+this.cur_actions.lt_cards+' Cards';
	}
	numQuestionsChanged(){
		if(this.cur_screen.id==4) this.cur_screen.screen_name = 'Question & Answer ('+this.cur_screen.num_questions+'x)';
		if(this.cur_screen.id==5) this.cur_screen.screen_name = 'Question ('+this.cur_screen.num_questions+'x)';
	}


	editScreen(index:number){
		this.editing_screen = index;
		this.editing_event = -1;
		this.cur_screen = this.playlist.screens[index];
	}

	deleteScreen(){		
		this.playlist.screens.splice(this.editing_screen, 1);
		this.editing_screen = -1;
	}


	editAction(index:number, parent_id:number){
		this.cur_actions = this.playlist.screens[parent_id].actions[index];
		this.editing_event = index;
		this.editing_screen = -1;
		this.action_parent_id = parent_id;
	}
	deleteAction(){		
		this.playlist.screens[this.action_parent_id].actions.splice(this.editing_event, 1)
		this.editing_event = -1;
	}

	doneEditing(){
		this.editing_screen = -1;
		this.editing_event = -1;
	}


  saveForm(){
		if(this.myForm.valid){
			this.showSave();
			this.gameServ.saveGame({
				id: this.myForm.get('id').value,
				game_name: this.myForm.get('game_name').value,
				playlist: this.playlist
			}).subscribe( res => {
				if(res!==null){
					if(res.hasOwnProperty('status') && res.status=='success'){
						this.saveSuccess();
					} else {
						// Show error message
						if(res.data.message) this.error_msg = res.data.message;
						this.showError();						
					} 
				} else this.showError();				
			}, error => {
				this.error_msg = error;         
				this.showError();
			}); 
		}
	}
	private showSave(){
		this.formState = 'saving';
		this.saveLabel = 'Saving...';
	}
	private resetSave(){
		this.formState = 'init';
		this.saveLabel = 'Save Changes';
	}	
	private saveSuccess(){
		this.formState = 'success';
		this.saveLabel = 'Saved Successfully!';
		setTimeout(() => { this.resetSave(); }, 2000);
	}	
	private showError(){
		this.formState = 'error';
		this.saveLabel = 'Form Error';
		setTimeout(() => { this.resetSave(); }, 4000);
	}
}
 