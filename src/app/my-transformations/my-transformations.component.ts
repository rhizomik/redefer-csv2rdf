import { Component, OnInit } from '@angular/core';
import { MyTransformationsService } from '../services/my-transformations.service';
import { RdfRef } from '../models/RdfRef';
import { FileDownloaderService } from '../services/file-downloader.service';
import { FilesList } from '../models/FileList';


@Component({
  selector: 'app-my-transformations',
  templateUrl: './my-transformations.component.html',
  styleUrls: ['./my-transformations.component.css']
})
export class MyTransformationsComponent implements OnInit {
  fileList = new FilesList();

  constructor(private transformationsService: MyTransformationsService,
              private fileDownloadService: FileDownloaderService) { }

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

}
