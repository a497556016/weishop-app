import { Injectable } from '@angular/core';
@Injectable()
export class Logger{
    private infos:string[] = [];
    private errors:string[] = [];
    constructor(){

    }

    info(msg:string){
        console.log(msg);
        this.infos.push(msg);
    }

    error(msg:string){
        console.log(msg);
        this.errors.push(msg);
    }
}