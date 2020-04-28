import { Injectable } from '@angular/core';
import { RDFRequest } from '../models/RDFRequest';

@Injectable({
  providedIn: 'root'
})
export class RDFRequestTransportation {

  data: RDFRequest;

  constructor() { }

}