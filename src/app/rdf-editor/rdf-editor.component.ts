import { Component, OnInit } from '@angular/core';
import { StateServiceService } from '../services/state-service.service';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-rdf-editor',
  templateUrl: './rdf-editor.component.html',
  styleUrls: ['./rdf-editor.component.css']
})
export class RdfEditorComponent implements OnInit {

  private file: File;
  private headers: Array<Array<String>> = [];
  private lines: Array<Array<String>> = [];


  constructor(private stateService: StateServiceService,
              private papa: Papa) { }

  ngOnInit() {
    this.file = this.stateService.data;
    this.stateService.data = null;
    console.log(this.file);
    const fileReader = new FileReader();
    this.papa.parse(this.file, {
      complete: (result) => {
        this.headers = result.data[0];

        result.data.map((item, index) => {
          if(index === 0) {
            this.headers = item;
          } else if (item.length !== 1){
            this.lines.push(item);
          }
          
        });
      }
    });

  }

  isNumeric(value) {
    return !isNaN(Number(value));
  }

}
