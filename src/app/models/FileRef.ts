
export class FileRef{
    originalName: string;
    file: Array<any>;

    constructor(originalName: string, file: Array<any>){
        this.originalName = originalName;
        this.file = file;
    }
}