import { Component, OnInit } from '@angular/core';
import { StateServiceService } from '../services/state-service.service';
import { Papa } from 'ngx-papaparse';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-rdf-editor',
  templateUrl: './rdf-editor.component.html',
  styleUrls: ['./rdf-editor.component.css']
})
export class RdfEditorComponent implements OnInit {

  private file: File;
  private headers: Array<Array<String>> = [];
  private lines: Array<Array<String>> = [];

  private formGroup: FormGroup;
  private inputTypes: Array<string>;

  constructor(private stateService: StateServiceService,
              private papa: Papa,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.file = this.stateService.data;
    this.stateService.data = null;
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
    this.inputTypes = new Array(this.headers.length)
    this.formGroup = this.fb.group({
      inputSubject: '',
      inputUri: '',
      inputFormat: '',
    })
  }
  
  onSubmit() {
    console.log(this.formGroup);
    console.log(this.inputTypes);
  }

  isNumeric(value) {
    return !isNaN(Number(value));
  }

}
