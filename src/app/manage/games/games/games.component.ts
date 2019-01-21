import { GamesService } from './../../../services/manage/games.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  rows;
	columns;
	selected = [];

	constructor(private gamesServ:GamesService, private router:Router) { }

	ngOnInit() {
		this.gamesServ.getGames().subscribe(res => {
			this.rows = res.data.games;
			this.columns = [
				{ name: 'Game Name', prop:'game_name' },
				{ name: 'Updated' },
				{ name: 'Created' }
			];
		});
	}


	createGame(){    
		this.gamesServ.createGame().subscribe(res => {
			this.router.navigate(['/manage/games/game/'+res.data.id]);
		});
	}

	onActivate(event) {
		if(event.type=='click') this.router.navigate(['/manage/games/game/'+event.row.id]);
	}
}