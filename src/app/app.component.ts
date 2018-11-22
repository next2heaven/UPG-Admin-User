import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UPG-Admin-User';
  
  users: Observable<any[]>;
  constructor(private db: AngularFirestore) {
    
  }

  ngOnInit(){
    this.users = this.db.collection('users').valueChanges();
  }
}
