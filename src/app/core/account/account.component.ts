import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fadeIn } from './../../animations';
import { AccountService } from './../../services/core/account.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [ fadeIn ]
})
export class AccountComponent implements OnInit {
	area:String = 'overview';
  profile;

  loading:Boolean = true;
	
  myForm:FormGroup;
	error_msg:String;
	error_PhotoMsg:String;
  formState:String = 'init';
  saveLabel:String = 'Save Changes';


  constructor(
    private accountServ:AccountService,
		private fb:FormBuilder,
		private route:ActivatedRoute
    ) { }

  ngOnInit() {
    this.accountServ.getAccount().subscribe(res => {
			this.profile = res.data.user;
			if(this.profile.avatar_url=='' || this.profile.avatar_url==null) this.profile.avatar_url = '/assets/imgs/default_avatar.png';
			
      this.loading = false;
      this.myForm.setValue({
				'fname': this.profile.fname,
				'lname': this.profile.lname,
				'company': this.profile.company,
				'email': this.profile.email,
				'timezone': this.profile.timezone,
			});
    });

    this.myForm = this.fb.group({
      fname:[''],
      lname:[''],
      company:[''],
			email:['', [
				Validators.required,
				Validators.email
      ]],      
      timezone:[''],
		});

		let segs = window.location.href.split('/');		
		if(segs[4] && segs[4]=='reset') this.area = 'reset';
		
  }

  // GETs
	get fname(){ return this.myForm.get('fname'); }
	get lname(){ return this.myForm.get('lname'); }
	get company(){ return this.myForm.get('company'); }
	get email(){ return this.myForm.get('email'); }
	get timezone(){ return this.myForm.get('timezone'); }
  




  changeArea(area){
		console.log(area);
		
    this.area = area;
	}
	

	uploadComplete(e){
		let url = e.cdnUrl+'-/scale_crop/175x175/';
		this.profile.avatar_url = url;
		this.accountServ.saveProfilePhoto(url).subscribe( res => {
			if(res!==null){
				if(!res.hasOwnProperty('status') || res.status!='success'){
					// Show error message
					if(res.data.message) this.error_PhotoMsg = res.data.message;		
				} 
			} else this.showError();				
		}, error => {
			this.error_msg = error;         
			this.showError();
		}); 
	}

  

  saveForm(){
    if(this.myForm.valid){
      this.showSave();
			this.accountServ.saveProfile(this.myForm).subscribe( res => {
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
		this.saveLabel = 'Saved Successfully!';
		setTimeout(() => { this.resetSave(); }, 2000);
	}	
	private showError(){
		this.formState = 'error';
		this.saveLabel = 'Form Error';
		setTimeout(() => { this.resetSave(); }, 2000);
	}

}
