import { SlidesService } from './../../../services/manage/slides.service';
import { Component, OnInit } from '@angular/core';
import { DataTable } from "simple-datatables"
import { Router } from '@angular/router';


@Component({
	selector: 'app-slides',
	templateUrl: './slides.component.html',
	styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit {
	rows;
	columns;
	selected = [];

	constructor(private slideServ:SlidesService, private router:Router) { }

	ngOnInit() {
			this.slideServ.getSlides().subscribe(res => {
			this.rows = res.data.slides;
			this.columns = [
				{ name: 'Slide Name', prop:'slide_name' },
				{ name: 'Updated' },
				{ name: 'Created' }
			];
		});
	}



	onActivate(event) {
		if(event.type=='click') this.router.navigate(['/manage/slides/slide/'+event.row.id]);
	}
	
}
