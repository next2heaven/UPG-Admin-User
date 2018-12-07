import { AccountComponent } from './../account.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fadeIn } from './../../../animations';
import { AccountService } from './../../../services/core/account.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  profile;

  myForm:FormGroup;
  error_msg:String;
  formState:String = 'init';
  saveLabel:String = 'Save Changes';
  loading:Boolean = true;	


  constructor(
    private accountServ:AccountService,
    private fb:FormBuilder,
    private account:AccountComponent
    ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
			password:['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      conf_password:['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    }, {validator: this.checkIfMatchingPasswords('password', 'conf_password')});
  }

  // GETs
	get password(){ return this.myForm.get('password'); }
	get conf_password(){ return this.myForm.get('conf_password'); }
  


  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
		return (group: FormGroup) => {
			let passwordInput = group.controls[passwordKey],
					passwordConfirmationInput = group.controls[passwordConfirmationKey];
			if (passwordInput.value !== passwordConfirmationInput.value) {
				return passwordConfirmationInput.setErrors({notEquivalent: true})
			}
			else {
					return passwordConfirmationInput.setErrors(null);
			}
		}
	}

  saveForm(){
    if(this.myForm.valid){
      this.showSave();
			this.accountServ.updatePass(this.myForm).subscribe( res => {
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
		this.saveLabel = 'Update Password';
	}	
	private saveSuccess(){
		this.formState = 'success';
		this.saveLabel = 'Updated Successfully!';
		setTimeout(() => { this.resetSave(); }, 2000);
	}	
	private showError(){
		this.formState = 'error';
		this.saveLabel = 'Form Error';
		setTimeout(() => { this.resetSave(); }, 4000);
	}

}
