import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VocabQuery } from '../models/VocabQuery';

@Injectable({
  providedIn: 'root'
})
export class VocabSuggestService {

  constructor(private http: HttpClient) { }

  getVocabsCall(query: string): Observable<any> {
    return this.http.get("https://lov.linkeddata.es/dataset/lov/api/v2/term/search?q=" + query);
  }

  getVocab(query: string) {
    let results = new Array<VocabQuery>();
    this.getVocabsCall(query).subscribe(data => {
      data.results.forEach(element => {
        element = element as VocabQuery;
        results.push(element);
      });
    })
    return results;
  }

}
