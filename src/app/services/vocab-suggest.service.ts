import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { VocabQuery } from '../models/VocabQuery';

@Injectable({
  providedIn: 'root'
})
export class VocabSuggestService {

  constructor(private http: HttpClient) { }

  /*getVocabsCall(query: string): Observable<any> {
    return this.http.get("https://lov.linkeddata.es/dataset/lov/api/v2/term/search?q=" + query+ "&type=property");
  }*/

  getVocabsCall(query: string): Observable<any> {
    let call: any;
    let observable = new Observable(subscriber => {
      this.http.get("https://lov.linkeddata.es/dataset/lov/api/v2/term/search?q=" + query+ "&type=property").subscribe(data => {
        call = data as any; 
        console.log(data);
        let allOccurrences = this.getAllOccurrences(call.results);
        let allReuses = this.getAllReuses(call.results);
        call.results.sort((a, b) => this.sortByScore(a, b, allOccurrences, allReuses));
        subscriber.next(call);
        });
    })
    return observable;
  }

  sortByScore(a, b, allOccurrences, allReuses) {
    let aRatio = this.getRatio(a, allOccurrences, allReuses);
    let bRatio = this.getRatio(b, allOccurrences, allReuses);
    if(aRatio < bRatio) {
      return 1;
    } else if(aRatio > bRatio) {
      return -1;
    }
    return 0;
  }

  getRatio(data, allOccurrences, allReUses) {
    return Math.round(
        (data.score + 
        (data["metrics.occurrencesInDatasets"][0] * 1.0 /
      Math.max(allOccurrences) ) +
          (data["metrics.reusedByDatasets"] * 1.0 /
      Math.max(allReUses) )
      ) * 100 / 3);
  }

  getAllReuses(data) {
    let array = new Array(data.length);
    for(let i in data){
      array[i] = data[i]["metrics.reusedByDatasets"][0];
    }
    return array;
  }
  
  
  getAllOccurrences(data) {
    let array = new Array(data.length);
    for(let i in data){
      array[i] = data[i]["metrics.occurrencesInDatasets"][0];
    }
    return array;
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
