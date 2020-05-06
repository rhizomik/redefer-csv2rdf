import { Component, OnInit } from '@angular/core';
import { MyTransformationsService } from '../services/my-transformations.service';
import { RdfRef } from '../models/RdfRef';
import { FileDownloaderService } from '../services/file-downloader.service';
import { FilesList } from '../models/FileList';
import { FileUploadService } from '../services/file-upload.service';
import { AuthenticationService } from '../services/authentication.service';
import { RDFRequest } from '../models/RDFRequest';
import { Router } from '@angular/router';
import { RDFRequestTransportation } from '../services/rdf-request-transportation.service';
import { StateServiceService } from '../services/state-service.service';


@Component({
  selector: 'app-my-transformations',
  templateUrl: './my-transformations.component.html',
  styleUrls: ['./my-transformations.component.css']
})
export class MyTransformationsComponent implements OnInit {
  fileList = new FilesList();

  constructor(private transformationsService: MyTransformationsService,
              private fileDownloadService: FileDownloaderService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private rdfRequestTransportation: RDFRequestTransportation,
              private stateService: StateServiceService) { }

  ngOnInit() {
    this.transformationsService.getAllTransformations().subscribe(data => {
      this.fileList = data as FilesList;
    });
  }
  
  downloadFile(i: number): void {
    let fileName = this.fileList.csvFiles[i];

    this.transformationsService.getRequestedFiles(fileName).subscribe(data => {
      console.log(data)
      this.fileDownloadService.download(fileName, data[0], null);
      this.fileDownloadService.download(this.fileList.rdfFiles[i], data[1], null);
    })
  }

  editFile(i: number): void {
    let fileName = this.fileList.csvFiles[i];
    this.transformationsService.getEditInfo(this.authenticationService.getCurrentUser(), fileName).subscribe(data => {
      let info = data as any
      let request = new RDFRequest()
      request.dataTypes = info.dataTypes;
      request.format = info.format;
      request.subject = info.subject;
      request.types = info.types;
      request.uri = info.uri;
      this.rdfRequestTransportation.data = request;
      this.stateService.data = new File([info.csvFile], info.fileName, {type:'text/csv'});
      this.router.navigate(['/editor'])
    })
  }
}
