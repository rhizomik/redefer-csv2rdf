import { Component, OnInit } from '@angular/core';
import { StateServiceService } from '../services/state-service.service';
import { Papa } from 'ngx-papaparse';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { RDFRequest } from '../models/RDFRequest';
import { FileUploadService } from '../services/file-upload.service';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../services/authentication.service';
import { FileDownloaderService } from '../services/file-downloader.service';
import { VocabSuggestService } from '../services/vocab-suggest.service';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, map } from 'rxjs/operators';
import { VocabQuery } from '../models/VocabQuery';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { RDFRequestTransportation } from '../services/rdf-request-transportation.service';

@Component({
  selector: 'app-rdf-editor',
  templateUrl: './rdf-editor.component.html',
  styleUrls: ['./rdf-editor.component.css']
})
export class RdfEditorComponent implements OnInit {

  file: File;
  headers: Array<String> = [];
  lines: Array<Array<String>> = [];

  formGroup: FormGroup;
  inputTypes: Array<string>;
  dataTypes: Array<string>;
  searching: boolean;
  isFormInvalid: boolean;  
  constructor(private stateService: StateServiceService,
              private papa: Papa,
              private fb: FormBuilder,
              private apiService: FileUploadService,
              private titleService: Title,
              private authenticationService: AuthenticationService,
              private fileDownloadService: FileDownloaderService,
              private vocabSuggestionService: VocabSuggestService,
              private rdfRequestTransportation: RDFRequestTransportation) { }

  ngOnInit() {
    this.isFormInvalid = false;
    this.titleService.setTitle("RDFTransformer - Editor")
    this.file = this.stateService.data;
    this.searching = false;
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
    if(this.rdfRequestTransportation.data == null) {
      this.inputTypes = new Array(this.headers.length);
      this.dataTypes = new Array(this.headers.length);
      this.formGroup = this.fb.group({
        inputSubject: '',
        inputUri: '',
        inputFormat: '',
      })
    } else {
      this.inputTypes = this.rdfRequestTransportation.data.types;
      this.dataTypes = this.parseDataTypeInverse(this.rdfRequestTransportation.data.dataTypes);
      this.inputTypes = this.rdfRequestTransportation.data.types;
      this.formGroup = this.fb.group({
        inputSubject: this.rdfRequestTransportation.data.subject,
        inputUri: this.rdfRequestTransportation.data.uri,
        inputFormat: this.rdfRequestTransportation.data.format,
      })
      this.rdfRequestTransportation.data = null;
    }
  }

  onSubmit() {
    let request = new RDFRequest();
    request.subject = this.formGroup.value.inputSubject;
    request.uri = this.formGroup.value.inputUri;
    request.format = this.formGroup.value.inputFormat;
    request.types = this.inputTypes;
    request.dataTypes = this.parseDataType(this.dataTypes);
    if(this.validateFormInput(request.subject, request.uri, request.format, request.types, request.dataTypes)) {
      this.isFormInvalid = false;
      if(this.authenticationService.isLoggedIn()) {
        this.apiService.postRDFDataUserRequest(this.authenticationService.getCurrentUser(), request, this.file).subscribe(data => { 
          this.fileDownloadService.download("rdf_converted.", data, request.format);
        });
      } else {
        this.apiService.postRDFDataRequest(request, this.file).subscribe(data => { 
          this.fileDownloadService.download("rdf_converted.", data, request.format);
        });
      }
    } else {
      this.isFormInvalid = true;
    }
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => term.length < 3 
        ? []
        : this.vocabSuggestionService.getVocabsCall(term).pipe(
          map(values => values.results.map( value => {
            return value.uri[0];
          }))
        )) 
     );
    }

  parseDataType(values: Array<string>) {
    let newValues = new Array<string>();
    for(let index in values){
      if(values[index] === "Integer") {
        newValues[index] = "_integer";
      }else if(values[index] === "Boolean") {
        newValues[index] = "_boolean";
      } else if(values[index] === "Date") {
        newValues[index] = "_date";
      }else if(values[index] === "Text") {
        newValues[index] = "text";
      } else if(values[index] === "Decimal"){
        newValues[index] = "NonInteger";
      } else if(values[index] === "Resource") {
        newValues[index] = "resource";
      } else {
        newValues[index] = values[index];
      } 
    } 
    return newValues;
  }

  parseDataTypeInverse(values: Array<string>) {
    let newValues = new Array<string>();
    for(let index in values){
      if(values[index] === "_integer") {
        newValues[index] = "Integer";
      }else if(values[index] === "_boolean") {
        newValues[index] = "Boolean";
      } else if(values[index] === "_date") {
        newValues[index] = "Date";
      }else if(values[index] === "text") {
        newValues[index] = "Text";
      }else if(values[index] === "NonInteger") {
        newValues[index] = "Decimal";
      } else if(values[index] === "resource") {
        newValues[index] = "Resource";
      }else {
        newValues[index] = values[index];
      } 
    } 
    return newValues;
  }

  isNumeric(value) {
    return !isNaN(Number(value));
  }

  validateFormInput(subject: string, uri: string, format: string, input: string[], dataTypes: string[]){
    if(subject === "" || uri === "" || format === "" || input.length != this.headers.length){
      return false;
    }
    for(let i in input) {
      if(input[i] === "" || dataTypes[i] === ""){
        return false;
      }
    }
    return true;
  }
 
}
