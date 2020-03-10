import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { VocabQuery } from '../models/VocabQuery';

@Injectable({
  providedIn: 'root'
})
export class VocabSuggestService {

  constructor(private http: HttpClient) { }

  getVocabsCall(query: string): Observable<any> {
    return this.http.get("https://lov.linkeddata.es/dataset/lov/api/v2/term/search?q=" + query+ "&type=property");
  }

  getVocab(query: string) : Observable<Array<VocabQuery>> {
    let results = new Array<VocabQuery>();
    this.getVocabsCall(query).subscribe(data => {
      data.results.forEach(element => {
        element = element as VocabQuery;
        results.push(element);
      });
    })
    return of(results);
  }

}
