import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { StateServiceService } from '../services/state-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './app-file-upload.component.html',
  styleUrls: ['./app-file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AppFileUploadComponent,
      multi: true
    }
  ]
})
export class AppFileUploadComponent implements OnInit {
 
files: any = [];
excessiveFiles: boolean = false;
wrongFormat: boolean = false;
noFile: boolean = false;

  constructor(private stateService: StateServiceService,
              private router: Router) {}

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element)
      this.noFile = false;
    }  
  }

  deleteAttachment(index) {
    this.files.splice(index, 1)
  }
  
  sendFile() {
    if(this.files.length > 1) {
      this.excessiveFiles = true;
    } else if (this.files.length == 0) {
      this.noFile = true;
    } else {
      const fileToUpload: File = this.files[0];
      if(fileToUpload.name.search('.csv$') != -1) {
        this.wrongFormat = false;
        this.noFile = false;
        this.excessiveFiles = false;
        this.stateService.data = fileToUpload;
        this.router.navigate(['/editor'])
   /*     this.fileUploadService.postFileToApi(fileToUpload).subscribe(data => {
          this.data = data; 
        });*/
      }else{
        this.wrongFormat = true;
      }
    } 
  }

  ngOnInit(): void {
  }

}
