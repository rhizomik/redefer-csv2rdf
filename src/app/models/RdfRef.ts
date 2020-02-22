import { FileRef } from './FileRef';

export class RdfRef {
    id: number;
    fileRef: FileRef;
    rdfFile: Array<any>;
    format: string;

    constructor(fileRef, rdfFile, format){
        this.fileRef = fileRef;
        this.format = this.getExtension(format);
        this.rdfFile = rdfFile;
        this.fileRef.file = rdfFile;
    }

    getExtension(format:string) : string {
        if(format === "RDF/XML"){
          return "xml";
        }else if(format === "RDF/JSON"){
          return "json";
        } else {
          return "txt";
        }
      }
}