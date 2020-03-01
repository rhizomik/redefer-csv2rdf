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
  searching: boolean;

  constructor(private stateService: StateServiceService,
              private papa: Papa,
              private fb: FormBuilder,
              private apiService: FileUploadService,
              private titleService: Title,
              private authenticationService: AuthenticationService,
              private fileDownloadService: FileDownloaderService,
              private vocabSuggestionService: VocabSuggestService) { }

  ngOnInit() {
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
    this.inputTypes = new Array(this.headers.length)
    this.formGroup = this.fb.group({
      inputSubject: '',
      inputUri: '',
      inputFormat: '',
    })
  }

  onSubmit() {
    let request = new RDFRequest();
    request.subject = this.formGroup.value.inputSubject;
    request.uri = this.formGroup.value.inputUri;
    request.format = this.formGroup.value.inputFormat;
    request.types = this.inputTypes;
    if(this.authenticationService.isLoggedIn()) {
      this.apiService.postRDFDataUserRequest(this.authenticationService.getCurrentUser(), request, this.file).subscribe(data => { 
        this.fileDownloadService.download("rdf_converted.", data, request.format);
      });
    } else {
      this.apiService.postRDFDataRequest(request, this.file).subscribe(data => { 
        this.fileDownloadService.download("rdf_converted.", data, request.format);
      });
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


  isNumeric(value) {
    return !isNaN(Number(value));
  }


}
