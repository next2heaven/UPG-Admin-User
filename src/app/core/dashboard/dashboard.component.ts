import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/core/dashboard.service';

declare var TweenMax: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  

  
  constructor(private dashServ:DashboardService) { }

  ngOnInit() {
    this.dashServ.userExample().subscribe(res => {
      console.log(res);
    });
    
  }


}
