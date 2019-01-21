import { GamePlaylist, GameLists, GameScreens } from './../../../shared/models/manage/games';
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
	error_msg:string;
	saveLabel:string = 'Save Changes';
	loading:boolean = true;	
  formState:string = 'init';
  playlist:GamePlaylist;
  editing_screen:number = 0;
  editing_event:number = 0;
  playlist_options = new GameLists();
  options: SortablejsOptions = {
    group:  { name : 'group1', pull: "clone", put: false, revertClone: false },
		animation: 150,
		onAdd:(event) => {
			setTimeout(() => { this.playlist_options = new GameLists(); }, 100);
		}
  };
  options2: SortablejsOptions = {
    group:  { name : 'group2', pull: "clone", put: false, revertClone: true },
		animation: 150
  };

  constructor(
		private fb:FormBuilder,
		private gameServ:GamesService,
		private activatedRoute:ActivatedRoute
	) {
		// setInterval(()=>{
		// 	console.log(this.playlist_options);
		// }, 6000);
	 }

	ngOnInit() {
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
		this.saveLabel = 'SAVE';
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
 