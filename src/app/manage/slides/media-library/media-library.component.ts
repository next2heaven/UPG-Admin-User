import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SlidesService } from 'src/app/services/manage/slides.service';
import { fadeIn } from 'src/app/animations';
import { UcWidgetComponent } from 'ngx-uploadcare-widget';

@Component({
  selector: 'app-media-library',
  templateUrl: './media-library.component.html',
  styleUrls: ['./media-library.component.scss'],
	animations: [ fadeIn ]
})
export class MediaLibraryComponent implements OnInit {
	@ViewChild(UcWidgetComponent) up_care: UcWidgetComponent;
  loading:boolean = true;
  files:any;
  error_PhotoMsg:string;

  constructor(
    public activeModal:NgbActiveModal,
    private slideServ:SlidesService
    ) { }

  ngOnInit() {
    this.slideServ.getMediaLibrary().subscribe(res => {
			if(res.status=='success'){
        this.files = res.data.media;
      }

			this.loading = false;			
		});
  }


  uploadComplete(e):void {
		let url = e.cdnUrl;
		
		this.slideServ.saveMedia({
      file_url: url,
      area:'slides'

    }).subscribe( res => {
			if(res!==null){
				if(!res.hasOwnProperty('status') || res.status!='success'){

					// Show error message
					if(res.data.message) this.error_PhotoMsg = res.data.message;
				} else {
          this.files.unshift({file_url:url});
        }
			} 
			//this.up_care.clearUploads();        <----- whats the deal with this creating an error?

		}, error => {
			this.error_PhotoMsg = error;
		}); 
  }
  

  useMediaFile(file_url):void {
    this.activeModal.close(file_url);
  }


  closeModal() {     
    this.activeModal.close('');
  }

}
