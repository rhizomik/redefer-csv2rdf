import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileDownloaderService {

  constructor() { }

  download(name: string, byte: any, format: string) : void {
    let file: File;
    if(format === null){
      file = new File([byte], name, {type:'text/plain'})
    } else{
      file = new File([byte], name + this.getExtension(format), {type:'text/plain'})
      console.log(file);

    }
    console.log(file);
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(file);
    link.download = file.name;
    link.click();
  }

  getExtension(format:string) : string {
    if(format === "RDF/XML"){
      return "rdf";
    }else if(format === "RDF/JSON"){
      return "json";
    }else if(format ==="csv"){
      return "csv";
    } else if(format === "TURTLE"){
      return "ttl";
    }else if(format === "N-Triples"){
      return "nt";
    }else{
      return "txt";
    }
  }
  makeFile(name, format, byte) : File {
    format = this.getExtension(format);
    return new File([byte], name + format, {type:'text/plain'})
  }
}
